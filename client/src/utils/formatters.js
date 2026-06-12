export const formatSalary = (number) => {
  if (number === undefined || number === null) return 'N/A';
  let inLakhs = number;
  if (number > 1000) {
    inLakhs = number / 100000;
  }
  return `₹${inLakhs.toFixed(1).replace(/\.0$/, '')} LPA`;
};

export const getExperienceLabel = (years) => {
  if (years === 0) return 'Fresher';
  if (years === 1) return '1 Year';
  return `${years} Years`;
};

export const getConfidenceColor = (confidence) => {
  if (confidence === 'Strong') return 'text-green-600 bg-green-50';
  if (confidence === 'Medium') return 'text-yellow-600 bg-yellow-50';
  if (confidence === 'Weak') return 'text-red-600 bg-red-50';
  return 'text-gray-600 bg-gray-50';
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};
