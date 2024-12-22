import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase Config:', {
  url: supabaseUrl,
  key: supabaseKey ? `${supabaseKey.slice(0, 5)}...${supabaseKey.slice(-5)}` : 'missing'
})

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

let supabaseInstance = null

export const useSupabase = () => {
  if (!supabaseInstance) {
    try {
      console.log('Creating new Supabase client...')
      
      // Create the client with minimal config first
      supabaseInstance = createClient(supabaseUrl, supabaseKey)
      
      // Test the connection immediately
      console.log('Testing Supabase connection...')
      supabaseInstance.auth.getSession().then(({ data, error }) => {
        if (error) {
          console.error('Supabase auth test failed:', error)
        } else {
          console.log('Supabase auth test successful')
        }
      })
      
      // Also test database access
      supabaseInstance
        .from('generated_images')
        .select('*')
        .limit(1)
        .then(({ data, error }) => {
          if (error) {
            console.error('Supabase database test failed:', error)
          } else {
            console.log('Supabase database test successful')
          }
        })
        .catch(err => {
          console.error('Supabase database test error:', err)
        })
        
      console.log('Supabase client created')
    } catch (error) {
      console.error('Failed to create Supabase client:', error)
      supabaseInstance = null
      throw error
    }
  }
  
  return supabaseInstance
}
