<script>
    let currentStep = 0;
    const steps = ['Welcome', 'Features Overview', 'Create Profile'];
  
    function nextStep() {
      if (currentStep < steps.length - 1) {
        currentStep += 1;
      }
    }
  
    function prevStep() {
      if (currentStep > 0) {
        currentStep -= 1;
      }
    }
  
    function setupProfile() {
      // Placeholder for profile setup action
      alert('Profile setup is currently not implemented.');
    }
  </script>
  
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
      <h2 class="text-2xl font-semibold mb-6">Get Started with ChainGuard</h2>
  
      {#if currentStep === 0}
      <!-- Step 1: Welcome -->
      <div>
        <p class="text-lg mb-4">Welcome to ChainGuard! Let's get started by setting up your profile.</p>
        <button on:click={nextStep} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Continue
        </button>
      </div>
  
      {:else if currentStep === 1}
      <!-- Step 2: Features Overview -->
      <div>
        <h3 class="text-xl font-bold mb-4">Features Overview</h3>
        <p class="text-md mb-4">With ChainGuard, you can protect your intellectual property using blockchain technology. Let’s set up your profile to get started.</p>
        <div class="flex justify-center space-x-4">
          <button on:click={prevStep} class="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
            Back
          </button>
          <button on:click={nextStep} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>
  
      {:else if currentStep === 2}
      <!-- Step 3: Create Profile -->
      <div>
        <h3 class="text-xl font-bold mb-4">Create Your Profile</h3>
        <p class="text-md mb-4">Complete your profile to start protecting your creations with ChainGuard.</p>
        <button on:click={setupProfile} class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Set Up Profile
        </button>
      </div>
      {/if}
  
      <!-- Progress Bar -->
      <div class="mt-6">
        <progress class="w-full h-2 bg-gray-300" value={currentStep} max={steps.length - 1}></progress>
      </div>
    </div>
  </section>
  