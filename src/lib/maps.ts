import { business } from '@/config/business'

export function getDirectionsUrl(): string {
  return business.googleMapsUrl
}

export function getReviewUrl(): string {
  return business.googleBusinessProfileUrl
}
