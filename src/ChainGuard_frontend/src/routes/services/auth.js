import { AuthClient } from '@dfinity/auth-client';
import { goto } from '$app/navigation'; // Correct import path
import { HttpAgent, Actor } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';

// Define the IDL interface for the canister
const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getUserDetails': IDL.Func([IDL.Text], [IDL.Opt(IDL.Record({ onboarded: IDL.Bool, iiId: IDL.Text }))], []),
    'setUserDetails': IDL.Func([IDL.Text, IDL.Text, IDL.Bool], [], [])
  });
};

// Set up the agent and actor
const agent = new HttpAgent({
  fetchRootKey: true,
});

const canisterId = 'bw4dl-smaaa-aaaaa-qaacq-cai'; // Update with your canister ID

const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

// Authenticate user with Internet Identity and interact with the canister
export const authenticateWithInternetIdentity = async () => {
  try {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: process.env.II_URL, // Ensure this environment variable is set
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const userId = identity.getPrincipal().toString(); // Obtain user ID
        const userDetails = await checkUserOnboardingStatus(userId);

        if (userDetails) {
          if (userDetails.onboarded) {
            goto('/UserManagement');
          } else {
            goto('/onboarding');
          }
        } else {
          // Handle case where user details are not found (e.g., initiate onboarding)
          goto('/onboarding');
        }
      },
    }).catch((error) => {
      console.error("Login failed:", error);
    });
  } catch (error) {
    console.error("AuthClient creation failed:", error);
  }
};

// Function to check user onboarding status
const checkUserOnboardingStatus = async (userId) => {
  try {
    const userDetails = await actor.getUserDetails(userId);
    return userDetails ?? null; // Return user details or null if not found
  } catch (error) {
    console.error('Failed to check user details:', error);
    return null;
  }
};

// Function to set user details
export const setUserDetails = async (userId, iiId, onboarded) => {
  try {
    await actor.setUserDetails(userId, iiId, onboarded);
  } catch (error) {
    console.error('Failed to set user details:', error);
  }
};
