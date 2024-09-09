<script>
    let name = '';
    let bio = '';
    let skills = '';
    let industryFocus = '';
    let profileImage = '';
  
    function saveProfile() {
      // Save profile information
    }
  
    function uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => profileImage = e.target.result;
        reader.readAsDataURL(file);
      }
    }
  </script>
  
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
      <h2 class="text-2xl font-semibold mb-6 text-center">Set Up Your Profile</h2>
  
      <!-- Profile Form -->
      <form on:submit|preventDefault={saveProfile}>
        <div class="mb-4">
          <label class="block text-gray-700">Name</label>
          <input type="text" bind:value={name} class="w-full p-3 border rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Bio</label>
          <textarea bind:value={bio} class="w-full p-3 border rounded" rows="4" required></textarea>
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Skills</label>
          <input type="text" bind:value={skills} placeholder="e.g. Blockchain, Web Development" class="w-full p-3 border rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Industry Focus</label>
          <input type="text" bind:value={industryFocus} placeholder="e.g. Creative Industry" class="w-full p-3 border rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Profile Image</label>
          <input type="file" on:change={uploadImage} class="w-full p-2 border rounded" accept="image/*" />
          {#if profileImage}
            <img src={profileImage} alt="Profile Preview" class="w-24 h-24 rounded-full mt-4" />
          {/if}
        </div>
  
        <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
          Save Profile
        </button>
      </form>
    </div>
  </section>
  