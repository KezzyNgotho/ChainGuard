<script>
  import { onMount } from 'svelte';
  import logo from '../assets/download2.png';
  import './style.scss';
  import { navigate } from 'svelte-routing'; // For routing, if applicable
  import { goto } from '$app/navigation';

  let currentStep = 0;
  const steps = ['Welcome', 'Features Overview', 'Create Profile', 'Additional Information'];
  let username = '';
  let email = '';
  let company = '';
  let website = '';
  let bio = '';
  let skills = '';
  let industry = '';
  let avatar = null;

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
    if (username && email) {
      alert(`Profile setup complete:\nUsername: ${username}\nEmail: ${email}\nCompany: ${company}\nWebsite: ${website}\nBio: ${bio}\nSkills: ${skills}\nIndustry: ${industry}`);
      nextStep();
    } else {
      alert('Please fill in all fields.');
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        avatar = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function finalizeSetup() {
    // Here, you would submit the complete profile to a backend, save it to localStorage, or perform another action.
    alert('Onboarding complete! Your profile is ready.');

    // Example of navigating the user programmatically using svelte-routing (or another routing library)
    goto('/Dashboard'); // Navigate to the dashboard after setup

    // Alternatively, if you're not using a routing library, you could perform another action here,
    // such as emitting an event or redirecting via an external library.
  }

  onMount(() => {
    // Initialization logic can go here
  });
</script>

<section class="background">
  <div class="container">
    <img src={logo} alt="ChainGuard Logo" class="logo" />

    <h2 class="text-2xl font-bold mb-4 text-gray-800">Welcome to ChainGuard</h2>

    <div class="card max-w-lg mx-auto p-6">
      {#if currentStep === 0}
      <!-- Step 1: Welcome -->
      <div>
        <p class="text-lg mb-4 text-gray-700">We’re excited to have you on board. Let’s set up your profile to get started!</p>
        <button on:click={nextStep} class="form-button">
          Get Started
        </button>
      </div>

      {:else if currentStep === 1}
      <!-- Step 2: Features Overview -->
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Discover Our Features</h3>
        <p class="text-md mb-4 text-gray-600">Explore how ChainGuard’s blockchain technology can protect your intellectual property. Continue to complete your profile.</p>
        <div class="flex justify-between">
          <button on:click={prevStep} class="form-button bg-gray-500 hover:bg-gray-600">
            Back
          </button>
          <button on:click={nextStep} class="form-button">
            Next
          </button>
        </div>
      </div>

      {:else if currentStep === 2}
      <!-- Step 3: Create Profile -->
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Set Up Your Profile</h3>
        <p class="text-md mb-4 text-gray-600">Fill out the details below to complete your profile and start using ChainGuard.</p>
        <form on:submit|preventDefault={setupProfile} class="space-y-3">
          <input type="text" placeholder="Username" bind:value={username} class="form-input w-full px-3 py-2 text-sm" />
          <input type="email" placeholder="Email" bind:value={email} class="form-input w-full px-3 py-2 text-sm" />
          <input type="text" placeholder="Company Name" bind:value={company} class="form-input w-full px-3 py-2 text-sm" />
          <input type="url" placeholder="Website URL" bind:value={website} class="form-input w-full px-3 py-2 text-sm" />

          <textarea placeholder="Bio" bind:value={bio} class="form-input w-full px-3 py-2 text-sm h-24 resize-none" />

          <input type="text" placeholder="Skills (comma separated)" bind:value={skills} class="form-input w-full px-3 py-2 text-sm" />

          <select bind:value={industry} class="form-input w-full px-3 py-2 text-sm">
            <option value="" disabled>Select Industry</option>
            <option value="Tech">Tech</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
          </select>

          <div class="mb-4">
            <label for="avatar" class="block text-gray-700">Profile Picture</label>
            <input type="file" id="avatar" accept="image/*" on:change={handleFileUpload} class="form-input w-full px-3 py-2 text-sm" />
            {#if avatar}
              <img src={avatar} alt="Avatar Preview" class="w-24 h-24 object-cover mt-2 rounded-full border border-gray-300" />
            {/if}
          </div>

          <button type="submit" class="form-button w-full px-4 py-2 text-sm">
            Complete Setup
          </button>
        </form>
      </div>

      {:else if currentStep === 3}
      <!-- Step 4: Additional Information -->
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Additional Information</h3>
        <p class="text-md mb-4 text-gray-600">Here’s where you can provide more details or upload any relevant documents to support your profile.</p>
        <!-- Additional content or upload functionality here -->
        <button on:click={finalizeSetup} class="form-button w-full px-4 py-2 text-sm">
          Finish
        </button>
      </div>
      {/if}
    </div>

    <!-- Progress Bar -->
    <div class="progress-bar-container mt-4">
      <div class="progress-bar h-1 bg-blue-500" style="width: {(currentStep / (steps.length - 1)) * 100}%"></div>
    </div>
  </div>
</section>
