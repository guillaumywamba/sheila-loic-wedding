export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function normalizeFullName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function rsvpAlreadyExists(
  list: { fullName: string; phone?: string }[],
  fullName: string,
  phone: string,
): boolean {
  const phoneKey = normalizePhone(phone);
  const nameKey = normalizeFullName(fullName);

  if (phoneKey.length < 6) return false;

  return list.some((entry) => {
    const entryPhone = normalizePhone(entry.phone ?? "");
    const entryName = normalizeFullName(entry.fullName);
    if (entryPhone.length >= 6 && entryPhone === phoneKey) return true;
    return entryName === nameKey && entryPhone === phoneKey;
  });
}
