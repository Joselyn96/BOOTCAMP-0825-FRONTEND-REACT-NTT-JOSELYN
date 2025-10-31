import { useState, useEffect } from 'react'

export interface District {
  id: number
  name: string
  province: string
  region: string
}

interface DistrictsData {
  districts: District[]
}

interface UseDistrictsReturn {
  districts: District[]
  isLoading: boolean
  error: string | null
}

export const useDistricts = (): UseDistrictsReturn => {
  const [districts, setDistricts] = useState<District[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // importar el archivo json
        const response = await import('../data/districts.json')
        const data: DistrictsData = response.default
        
        setDistricts(data.districts)
      } catch (err) {
        console.error('Error loading districts:', err)
        setError('Error al cargar los distritos')
      } finally {
        setIsLoading(false)
      }
    }

    loadDistricts()
  }, [])

  return {
    districts,
    isLoading,
    error
  }
}