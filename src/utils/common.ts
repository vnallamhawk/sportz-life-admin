// utils/calculateAge.js

export function calculateAge(dob:Date) {
    const birthDate = new Date(dob);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    // If birth month is greater than current month or 
    // the birth month is the same but birth date is greater than today's date, subtract a year.
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  