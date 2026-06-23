const FACULTY_EMAIL_FILE = "email.txt";
const ALLOWED_STUDENT_RANGES = [
  { prefix:"23wh1a66", start:1, end:64 },
  { prefix:"24wh5a66", start:1, end:7 }
];
let facultyEmailCachePromise = null;

export function normalizeEmail(value){
  return String(value || "").trim().toLowerCase();
}

export function normalizeRollNumber(value){
  return String(value || "").trim().toLowerCase().replace(/\s+/g, "");
}

export function isOfficialBvrithEmail(email){
  return normalizeEmail(email).endsWith("@bvrithyderabad.edu.in");
}

export function isAllowedStudentRollNumber(rollNumber){
  const normalizedRollNumber = normalizeRollNumber(rollNumber);
  return ALLOWED_STUDENT_RANGES.some((range)=>{
    const pattern = new RegExp("^" + range.prefix + "(\\d{2})$");
    const match = normalizedRollNumber.match(pattern);
    if(!match){
      return false;
    }

    const serialNumber = Number(match[1]);
    return serialNumber >= range.start && serialNumber <= range.end;
  });
}

export function isAllowedStudentEmail(email){
  const normalizedEmail = normalizeEmail(email);
  if(!isOfficialBvrithEmail(normalizedEmail)){
    return false;
  }

  return isAllowedStudentRollNumber(normalizedEmail.split("@")[0]);
}

async function readFacultyEmailFile(){
  const response = await fetch(FACULTY_EMAIL_FILE, { cache: "no-store" });
  if(!response.ok){
    throw new Error("Unable to load faculty email list.");
  }

  const text = await response.text();
  return new Set(
    text
      .split(/\r?\n/)
      .map((line) => normalizeEmail(line))
      .filter(Boolean)
  );
}

export async function loadFacultyWhitelist(){
  if(!facultyEmailCachePromise){
    facultyEmailCachePromise = readFacultyEmailFile().catch((error) => {
      facultyEmailCachePromise = null;
      throw error;
    });
  }

  return facultyEmailCachePromise;
}

export async function isFacultyWhitelisted(email){
  const normalizedEmail = normalizeEmail(email);
  if(!normalizedEmail){
    return false;
  }

  try{
    const whitelist = await loadFacultyWhitelist();
    return whitelist.has(normalizedEmail);
  }catch(error){
    console.error(error);
    return false;
  }
}
