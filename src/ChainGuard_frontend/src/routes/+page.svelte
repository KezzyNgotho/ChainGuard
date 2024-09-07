<script>
  import "../index.scss";
  import { backend } from "$lib/canisters";
  import x from '../routes/assets/download.jpeg'
 
 
 
    // Define any local state or methods here if necessary
</script>

<section class="bg-gray-50 min-h-screen">
  <!-- Navbar -->
  <nav class="flex items-center justify-between p-6 bg-white shadow-md">
    <div class="text-xl font-bold text-gray-800">AuthentiChain</div>
    <div class="space-x-4">
      <a href="#features" class="text-gray-600 hover:text-gray-800">Features</a>
      <a href="#how-it-works" class="text-gray-600 hover:text-gray-800">How It Works</a>
      <a href="#contact" class="text-gray-600 hover:text-gray-800">Contact</a>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md">Get Started</button>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="text-center py-20 bg-blue-50">
    <h1 class="text-4xl font-extrabold text-gray-800 mb-4">Secure Your Intellectual Property with AuthentiChain</h1>
    <p class="text-lg text-gray-600 mb-8">
      Protect, manage, and monetize your creative works in a decentralized way, powered by blockchain.
    </p>
    <button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700">
      Register Now
    </button>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-16 bg-white">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Decentralized IP Registration</h3>
          <p class="text-gray-600">Your IP rights secured on the blockchain with transparent proof of ownership.</p>
        </div>
        <div class="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Licensing & Marketplace</h3>
          <p class="text-gray-600">Monetize your IP with custom licenses and discover potential buyers.</p>
        </div>
        <div class="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">AI-Powered Plagiarism Detection</h3>
          <p class="text-gray-600">Receive real-time alerts for unauthorized usage of your IP.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section id="how-it-works" class="py-16 bg-gray-50">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src="./assets/" alt="How It Works" class="rounded-lg shadow-lg">
        </div>
        <div class="flex flex-col justify-center">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">1. Register Your IP</h3>
            <p class="text-gray-600">Easily submit your work and register your IP rights on the blockchain.</p>
          </div>
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">2. Create Licenses</h3>
            <p class="text-gray-600">Set custom licensing terms and make your IP available for monetization.</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">3. Protect and Earn</h3>
            <p class="text-gray-600">Monitor for infringements and automatically receive payments for your licensed works.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-16 bg-white">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-12">Get in Touch</h2>
      <p class="text-gray-600 mb-6">Have questions or want to learn more? Drop us a message, and we’ll get back to you as soon as possible.</p>
      <form class="max-w-lg mx-auto">
        <input type="email" placeholder="Your Email" class="w-full px-4 py-3 mb-4 border rounded-lg">
        <textarea placeholder="Your Message" class="w-full px-4 py-3 mb-4 border rounded-lg"></textarea>
        <button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-6 bg-gray-800 text-white text-center">
    <p>&copy; 2024 AuthentiChain. All rights reserved.</p>
  </footer>
</section>

