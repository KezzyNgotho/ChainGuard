import { HttpAgent, Actor } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';

// Define the IDL interface for the canister
const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getUserDetails': IDL.Func([IDL.Text], [IDL.Opt(IDL.Record({ onboarded: IDL.Bool, iiId: IDL.Text }))], []),
    'setUserDetails': IDL.Func([IDL.Text, IDL.Text, IDL.Bool], [], [])
  });
};

// Set up the agent for production
const agent = new HttpAgent();

const canisterId = 'your-canister-id'; // Update with your canister ID

const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

// Function to check user onboarding status
export const checkUserOnboardingStatus = async (userId) => {
  try {
    const userDetails = await actor.getUserDetails(userId);
    if (userDetails) {
      return userDetails.onboarded;
    } else {
      return false; // User details not found
    }
  } catch (error) {
    console.error('Failed to check user details:', error);
    return false;
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
