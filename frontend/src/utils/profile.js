export const isProfileComplete = (user) => {
  if (!user) return false;

  return !!(
    user.firstName?.trim() &&
    user.lastName?.trim() &&
    user.phone?.trim() &&
    user.bio?.trim() &&
    user.avatarUrl?.trim()
  );
};
