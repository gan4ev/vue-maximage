import { useUser, useClerk } from '@clerk/vue'
import { useSupabase } from './useSupabase'
import { watch } from 'vue'

export const useUserSync = () => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const supabase = useSupabase()

  const syncUserToSupabase = async (clerkUser) => {
    if (!clerkUser) {
      console.log('No Clerk user found')
      return
    }

    console.log('Syncing Clerk user:', {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName
    })

    try {
      // Check if user exists
      console.log('Checking for existing user with clerk_id:', clerkUser.id)
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', clerkUser.id)
        .single()

      if (fetchError) {
        console.log('Fetch error:', fetchError)
        if (fetchError.code !== 'PGRST116') { // PGRST116 is "not found" error
          console.error('Error fetching user:', fetchError)
          return
        }
      }

      console.log('Existing user:', existingUser)

      const userData = {
        clerk_id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        full_name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        avatar_url: clerkUser.imageUrl,
      }

      console.log('User data to save:', userData)

      if (!existingUser) {
        console.log('Creating new user...')
        // Create new user
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            ...userData,
            created_at: new Date().toISOString()
          })
          .select()
          .single()

        if (insertError) {
          console.error('Error creating user:', insertError)
          return
        }
        console.log('New user created:', newUser)
      } else {
        console.log('Updating existing user...')
        // Update existing user
        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({
            ...userData,
            updated_at: new Date().toISOString()
          })
          .eq('clerk_id', clerkUser.id)
          .select()
          .single()

        if (updateError) {
          console.error('Error updating user:', updateError)
          return
        }
        console.log('User updated:', updatedUser)
      }

      console.log('User sync completed successfully')
    } catch (error) {
      console.error('Error syncing user:', error)
    }
  }

  // Watch for user changes
  watch(user, (newUser) => {
    if (newUser) {
      console.log('User changed in Clerk:', newUser)
      syncUserToSupabase(newUser)
    } else {
      console.log('User signed out')
    }
  }, { immediate: true })

  return {
    syncUserToSupabase
  }
}
