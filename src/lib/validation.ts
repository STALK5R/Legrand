export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

export const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

export const MAX_PHOTO_COUNT = 8
export const MAX_PHOTO_SIZE_MB = 10
export const ACCEPTED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']

export function validatePhotos(files: File[]): string | null {
  if (files.length > MAX_PHOTO_COUNT) {
    return `Please attach ${MAX_PHOTO_COUNT} photos or fewer.`
  }
  for (const file of files) {
    const sizeMb = file.size / (1024 * 1024)
    if (sizeMb > MAX_PHOTO_SIZE_MB) {
      return `"${file.name}" is larger than ${MAX_PHOTO_SIZE_MB}MB. Please use a smaller photo.`
    }
    const typeOk =
      ACCEPTED_PHOTO_TYPES.includes(file.type) || /\.(jpe?g|png|webp|heic)$/i.test(file.name)
    if (!typeOk) {
      return `"${file.name}" isn't a supported image type. Please use JPG, PNG, WEBP, or HEIC.`
    }
  }
  return null
}
