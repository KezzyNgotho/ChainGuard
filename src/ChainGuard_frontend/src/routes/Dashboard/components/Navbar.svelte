<script>
    import { onMount } from 'svelte';
    let isOpen = true;
  
    function toggleSidebar() {
      isOpen = !isOpen;
    }
  </script>
  
  <style>
    .sidebar {
      transition: transform 0.3s ease;
    }
    .sidebar.open {
      transform: translateX(0);
    }
    .sidebar.closed {
      transform: translateX(-250px);
    }
  </style>
  
  <aside class={`sidebar bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 z-50 ${isOpen ? 'open' : 'closed'}`}>
    <div class="flex items-center justify-between p-4 border-b border-gray-700">
      <h1 class="text-xl font-bold">IP Dashboard</h1>
      <button on:click={toggleSidebar} class="text-gray-400 hover:text-white">
        {#if isOpen}
          <span>&#x2715;</span> <!-- Close icon -->
        {:else}
          <span>&#9776;</span> <!-- Menu icon -->
        {/if}
      </button>
    </div>
    <nav class="mt-4">
      <ul class="space-y-2">
        <li><a href="#register" class="block px-4 py-2 hover:bg-gray-700 rounded">Register IP</a></li>
        <li><a href="#marketplace" class="block px-4 py-2 hover:bg-gray-700 rounded">Marketplace</a></li>
        <li><a href="#licenses" class="block px-4 py-2 hover:bg-gray-700 rounded">Manage Licenses</a></li>
        <li><a href="#settings" class="block px-4 py-2 hover:bg-gray-700 rounded">Settings</a></li>
        <li><a href="#logout" class="block px-4 py-2 hover:bg-gray-700 rounded">Logout</a></li>
      </ul>
    </nav>
  </aside>
  