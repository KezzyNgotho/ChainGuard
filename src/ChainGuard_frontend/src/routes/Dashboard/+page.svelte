<script>
    import { onMount, onDestroy } from 'svelte';
    import { idlFactory as ChainGuardIDL } from '../../../../declarations/ChainGuard_backend';
    import { Actor, HttpAgent } from '@dfinity/agent';
    import Sidebar from './components/Sidebar.svelte';
    import image from '../assets/download2.png';

    let selfieInput;
    let documentInput;
    let ChainGuardBackend;
    let selfie = null;
    let kycVerified = false;
    let ipSubmitted = false;
    let confirmationReceived = false;
    let showModal = false;
    let title = '';
    let description = '';
    let category = '';
    let fileInputs = []; 
    let recentActivities = [];
    let payments = [];
    let ipList = [];
    let wishlist = [];
    let notifications = [];
    
    let uploadedFiles = [];
    let showConfirmation = false;
    let transactionId = '';
    let licenses = [];
    let selectedLicense = null;
    let renewalMessage = '';
    let showRenewalModal = false;
    let userId = 'user123'; // Example user ID
    let textInput = '';
    let plagiarismResult = '';
    let fileInput = null;
    let file =[];
    let isChecking = false;
    let searchQuery = '';
    let selectedCategory = '';
    let filterCategory = '';
    let ips = [];
    let filteredIps = [];
    let selectedIp = null;
    let contactRequest = '';
    let selectedView = 'dashboard';
    let isProfileMenuOpen = false;
    
    let termsAgreed = false;
    //let isProfileMenuOpen = false;

  function changeView(event) {
    selectedView = event.detail;
  }
  export let view;
  

    // Initialize the backend
    async function initializeBackend() {
        try {
            const agent = new HttpAgent();
            if (process.env.NODE_ENV !== 'production') {
                await agent.fetchRootKey();
            }
            ChainGuardBackend = Actor.createActor(ChainGuardIDL, {
                agent,
                canisterId: 'bkyz2-fmaaa-aaaaa-qaaaq-cai'
            });
        } catch (error) {
            console.error('Error initializing backend:', error);
        }
    }

    onMount(async () => {
        await initializeBackend();
        startCamera(); // If the camera needs to start immediately
    });

    onDestroy(() => {
        stopCamera();
    });

    // Camera management
    let videoElement = null;
    let videoStream = null;

    async function startCamera() {
        try {
            if (!videoElement) {
                console.error('Video element not available.');
                return;
            }
            videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = videoStream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    function stopCamera() {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
            if (videoElement) {
                videoElement.srcObject = null;
            }
        }
    }

    function captureSelfie() {
        if (!videoElement) {
            console.error('Video element not available.');
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        selfie = canvas.toDataURL('image/png');
        stopCamera(); // Stop the camera after capturing
    }

    // Submit KYC Documents
    async function submitKycDocuments() {
    if (!selfie || !documentInput || !documentInput.files.length) {
        console.error('Please select a selfie and documents.');
        return;
    }

    // Convert selfie to byte array
    const selfieBlob = new Blob([selfie], { type: 'image/png' });
    const selfieArrayBuffer = await selfieBlob.arrayBuffer();
    const selfieBytes = new Uint8Array(selfieArrayBuffer);

    // Convert documents to byte arrays
    const documentFiles = Array.from(documentInput.files);
    const documentBlobs = await Promise.all(
        documentFiles.map(async (file) => {
            const fileBlob = new Blob([file], { type: file.type });
            const fileArrayBuffer = await fileBlob.arrayBuffer();
            return new Uint8Array(fileArrayBuffer);
        })
    );

    const kycData = {
        selfie: Array.from(selfieBytes),
        documents: documentBlobs.map(blob => Array.from(blob)),
        userId: 'user123', // Replace with actual user ID
    };

    try {
        const result = await ChainGuardBackend.submitKyc(kycData);
        if (result) {
            console.log('KYC data submitted successfully');
            kycVerified = true; // Update KYC status
        } else {
            console.error('Error submitting KYC data');
        }
    } catch (error) {
        console.error('Error submitting KYC documents:', error);
    }
}


    // Submit IP
    function handleFileInput(event) {
        file = event.target.files[0]; // Update file input handler
    }

    async function submitIP(event) {
        event.preventDefault(); // Prevent default form submission

        if (!title || !description || !category || !file) {
            alert('Please fill out all required fields and upload a file.');
            return;
        }

        try {
            const ipData = {
                title,
                description,
                category,
                file: await fileToBlob(file),
                userId: 'exampleUserId' // Replace with actual user ID
            };

            const result = await ChainGuardBackend.submitIP(ipData); // Call the Motoko function
            console.log('IP submission result:', result);
            // Handle result (e.g., show a success message)
        } catch (error) {
            console.error('Error submitting IP:', error);
        }
    }

    async function fileToBlob(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(new Uint8Array(reader.result));
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }



    function validateKycForm() {
        if (!selfie || !documentInput || !documentInput.files.length) {
            alert("Please upload all required documents and take a selfie.");
            return false;
        }
        return true;
    }

    function validateIpForm() {
        if (!title || !description || !category || uploadedFiles.length === 0) {
            alert("All fields must be filled out and a file must be uploaded.");
            return false;
        }
        return true;
    }

    function handleFileUpload(event) {
        const files = event.target.files;
        // Process the files as needed
    }

    function handleSearch() {
        filteredIps = ipList.filter(ip =>
            (ip.title.toLowerCase().includes(searchQuery.toLowerCase()) || ip.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (filterCategory ? ip.category === filterCategory : true)
        );
    }

    function handleCategoryChange(event) {
        filterCategory = event.target.value;
        handleSearch();
    }

    function handleContactSubmit(ip) {
        console.log(`Requesting contact for IP ID: ${ip.id} with message: ${contactRequest}`);
        selectedIp = null;
        contactRequest = '';
    }

    function submitIp(event) {
        event.preventDefault();
        if (termsAgreed) {
            ipSubmitted = true;
        } else {
            alert("You must agree to the terms and conditions before submitting.");
        }
    }

    function handleCreateIP() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    function toggleProfileMenu() {
        isProfileMenuOpen = !isProfileMenuOpen;
    }
   


   // let fileInputs = [];

 /*    function handleFileInput(event) {
        fileInputs = Array.from(event.target.files);
        console.log('Files selected:', fileInputs); // Debugging: Check the files array
    } */

</script>


<div class="flex h-screen">
    <!-- Sidebar -->
  
        <Sidebar on:linkClick={changeView} />

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <header class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Welcome</h2>
            <div class="relative">
                <button class="flex items-center space-x-2" on:click={toggleProfileMenu}>
                    <img src={image} alt="User Avatar" class="w-12 h-12 rounded-full border border-gray-300" />
                    <span class="font-semibold text-gray-800">ICP Doe</span>
                </button>
                {#if isProfileMenuOpen}
                    <div class="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48">
                        <ul class="py-2">
                            <li><a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">View Profile</a></li>
                            <li><a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit Profile</a></li>
                            <li><a href="/logout" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a></li>
                        </ul>
                    </div>
                {/if}
            </div>
        </header>
        
        <!-- Main Sections -->
        <section class="dashboard p-6 bg-gray-50">
            <!-- Overview Section -->
            {#if selectedView === 'dashboard'}
                <section class="overview mb-8">
                    <div class="quick-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <!-- Example stat card -->
                        <div class="stat-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">Registered IPs</h3>
                            <p class="text-4xl font-bold text-gray-900">123</p>
                        </div>
                        <!-- Add more stat cards here -->
                    </div>
                   
                </section>
        
                <!-- Recent Activity Section -->
                <section class="recent-activity mb-8">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div class="timeline space-y-4">
                        {#each recentActivities as activity (activity.id)}
                            <div class="activity-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                <p class="text-gray-800 mb-1"><span class="font-semibold">{activity.type}:</span> {activity.description}</p>
                                <p class="text-gray-500 text-sm">{activity.date}</p>
                            </div>
                        {/each}
                    </div>
                </section>
        
                <!-- Quick Links Section -->
                <section class="quick-links">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
                    <div class="links grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a href="#" class="link-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <h4 class="text-lg font-semibold text-gray-800 mb-2">Register New IP</h4>
                            <p class="text-gray-600">Quickly register new intellectual property.</p>
                        </a>
                        <!-- Add more quick links here -->
                    </div>
                </section>
            {/if}
        </section>
        
            
        <!-- IP Registration Section -->
        {#if selectedView === 'ip-registration'}
        <section class="ip-registration py-10 px-6 max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-800 mb-10 text-center">IP Registration</h2>
    
            {#if !kycVerified}
                <section class="kyc-verification mb-12 bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-4">Identity Verification (KYC)</h3>
                    <p class="text-gray-600 mb-6">To ensure the legitimacy of intellectual property, we require identity verification. Please submit your identification documents and complete face verification.</p>
    
                    <!-- Document Upload -->
                  <!-- Document Upload -->
                  <div class="kyc-upload-area border-dashed border-2 border-gray-300 p-6 rounded-lg mb-6">
                    <p class="text-gray-600 mb-4">Drag and drop your ID documents here or click to upload.</p>
                    <input 
                        type="file" 
                        id="idUpload" 
                        accept="image/*,application/pdf" 
                        class="hidden" 
                        bind:this={documentInput} 
                        multiple 
                        on:change={handleFileUpload}
                    />
                    <label 
                        for="idUpload" 
                        class="block p-4 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                        Upload Documents
                    </label>
                </div>
              <!--   {#if documents}
                <img src={document} alt="document Preview" class="mt-4 border rounded-lg" />
            {/if} -->
    
                    <!-- Face Verification -->
                    <div class="face-verification mb-6">
                        <p class="text-gray-600 mb-4">Please take a selfie for face verification.</p>
                        <div class="camera-container">
                            <video bind:this={videoElement} autoplay playsinline></video>
                            <button on:click={captureSelfie}>Capture Selfie</button>
                        </div>
                        {#if selfie}
                            <img src={selfie} alt="Selfie Preview" class="mt-4 border rounded-lg" />
                        {/if}
                    </div>
    
                    <button type="button" on:click={submitKycDocuments}>Submit KYC</button>
                </section>
            {/if}
    
            {#if kycVerified && !ipSubmitted}
                <!-- IP Submission Form -->
                <section>
                    <h2 class="text-3xl font-semibold text-gray-800 mb-4">Submit Your IP</h2>
                    <form on:submit={submitIP}>
                        <label for="title" class="block text-gray-700 mb-2">Title:</label>
                        <input type="text" name="title" bind:value={title} class="w-full p-2 border rounded-lg mb-4" required>
                
                        <label for="description" class="block text-gray-700 mb-2">Description:</label>
                        <textarea name="description" bind:value={description} class="w-full p-2 border rounded-lg mb-4" required></textarea>
                
                        <label for="category" class="block text-gray-700 mb-2">Category:</label>
                        <select id="category" bind:value={category} class="w-full p-2 border rounded-lg mb-4" required>
                            <option value="">Select a category</option>
                            <option value="technology">Technology</option>
                            <option value="science">Science</option>
                            <!-- Add more categories as needed -->
                        </select>
                
                        <label for="file" class="block text-gray-700 mb-2">Upload File:</label>
                        <input type="file" name="file" multiple on:change={handleFileInput} class="w-full p-2 border rounded-lg mb-4" required>
                
                        <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Submit IP</button>
                    </form>
                </section>


               
            {/if}
    
            {#if ipSubmitted && !confirmationReceived}
                <!-- IP Review Section -->
                <section>
                    <h2 class="text-3xl font-semibold text-gray-800 mb-4">Review Your IP Submission</h2>
                    <p class="text-gray-600 mb-4">Your IP has been successfully submitted and is awaiting confirmation.</p>
                    <button class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition" on:click={confirmSubmission}>Confirm Submission</button>
                </section>
            {/if}
    
            {#if confirmationReceived}
                <!-- IP Confirmation Section -->
                <section>
                    <h2 class="text-3xl font-semibold text-gray-800 mb-4">IP Confirmation</h2>
                    <p class="text-gray-600 mb-4">Your IP has been successfully registered on the blockchain.</p>
                    <p class="text-gray-600">Thank you for your submission!</p>
                </section>
            {/if}
        </section>
    {/if}
    
        <!-- Payments Section -->
        {#if selectedView === 'payments'}
            <section class="payments mb-8">
                <h3 class="text-xl font-semibold mb-4">Payments</h3>
                <div class="payments-table bg-white p-4 rounded-lg shadow-lg">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="p-2 text-left">Description</th>
                                <th class="p-2 text-left">Amount</th>
                                <th class="p-2 text-left">Date</th>
                                <th class="p-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each payments as payment (payment.id)}
                                <tr>
                                    <td class="p-2">{payment.description}</td>
                                    <td class="p-2">{payment.amount}</td>
                                    <td class="p-2">{payment.date}</td>
                                    <td class="p-2">{payment.status}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </section>
        {/if}


        
        <!-- Marketplace Section -->
        {#if selectedView === 'marketplace'}
    <section class="marketplace py-10 px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Marketplace</h2>

        <!-- Search and Filters -->
        <section class="search-filters mb-8">
            <input
                type="text"
                placeholder="Search IPs"
                bind:value={searchQuery}
                class="input mb-4 p-3 border rounded-lg w-full"
                on:input={searchIps}
            />
            <select
                bind:value={filterCategory}
                class="input mb-4 p-3 border rounded-lg w-full"
                on:change={searchIps}
            >
                <option value="">Select Category</option>
                <option value="patent">Patent</option>
                <option value="trademark">Trademark</option>
                <option value="copyright">Copyright</option>
            </select>
        </section>

        <!-- IP Cards -->
        <section class="marketplace-page mb-8">
            <h3 class="text-xl font-semibold mb-4">Browse IP</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each ipList as ip}
                    <div class="ip-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
                        <img src={ip.thumbnail} alt="IP Thumbnail" class="w-full mb-4 rounded-lg" />
                        <h4 class="text-lg font-bold mb-2">{ip.title}</h4>
                        <p class="text-gray-600 mb-2">{ip.description}</p>
                        <button
                            class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            on:click={() => viewOnBlockchain(ip)}
                        >
                            View Details
                        </button>
                        <button
                            class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition mt-2"
                            on:click={() => addToWishlist(ip)}
                        >
                            Add to Wishlist
                        </button>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Wishlist Section -->
        {#if wishlist.length > 0}
            <section class="wishlist mb-8">
                <h3 class="text-xl font-semibold mb-4">Your Wishlist</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each wishlist as ip}
                        <div class="ip-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
                            <img src={ip.thumbnail} alt="IP Thumbnail" class="w-full mb-4 rounded-lg" />
                            <h4 class="text-lg font-bold mb-2">{ip.title}</h4>
                            <p class="text-gray-600 mb-2">{ip.description}</p>
                            <button
                                class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                                on:click={() => removeFromWishlist(ip)}
                            >
                                Remove from Wishlist
                            </button>
                        </div>
                    {/each}
                </div>
            </section>
        {/if}

        <!-- Notifications -->
        {#each notifications as notification}
            <div class="notification">{notification}</div>
        {/each}
    </section>
{/if}

{#if selectedView === 'license-management'}
<section class="license-management py-10 px-4">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">License Management</h2>

    <!-- License List -->
    <section class="licenses mb-8">
        <h3 class="text-xl font-semibold mb-4">Your Licenses</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each licenses as license}
                <div class="license-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition" on:click={() => handleLicenseClick(license)}>
                    <h4 class="text-lg font-bold mb-2">{license.title}</h4>
                    <p class="text-gray-600 mb-2">{license.description}</p>
                    <p class="text-gray-400 mb-2">Expiration Date: {license.expirationDate}</p>
                    <p class="text-gray-600 mb-2">Status: {license.status}</p>
                    <button class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-2" on:click={handleRenewal}>Renew License</button>
                </div>
            {/each}
        </div>
    </section>

    <!-- License Details Modal -->
    {#if selectedLicense}
        <section class="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
                <h3 class="text-xl font-semibold mb-4">License Details</h3>
                <p><strong>Title:</strong> {selectedLicense.title}</p>
                <p><strong>Description:</strong> {selectedLicense.description}</p>
                <p><strong>Expiration Date:</strong> {selectedLicense.expirationDate}</p>
                <p><strong>Status:</strong> {selectedLicense.status}</p>
                <button class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition mt-4" on:click={() => selectedLicense = null}>Close</button>
            </div>
        </section>
    {/if}

    <!-- Renewal Modal -->
    {#if showRenewalModal}
        <section class="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
                <h3 class="text-xl font-semibold mb-4">Renew License</h3>
                <p><strong>License:</strong> {selectedLicense ? selectedLicense.title : ''}</p>
                <textarea
                    bind:value={renewalMessage}
                    placeholder="Enter your renewal request message"
                    class="input mb-4 p-3 border rounded-lg w-full"
                ></textarea>
                <button class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mr-2" on:click={submitRenewal}>Submit Renewal</button>
                <button class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition" on:click={closeRenewalModal}>Cancel</button>
            </div>
        </section>
    {/if}
</section>

{/if}

{#if selectedView === 'plagiarism-detection'}


<section class="plagiarism-detection py-10 px-4">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Plagiarism Detection</h2>

    <!-- Text Input -->
    <div class="mb-6">
        <label for="textInput" class="block text-lg font-semibold mb-2">Enter Text:</label>
        <textarea
            id="textInput"
            bind:value={textInput}
            class="input p-3 border rounded-lg w-full mb-4"
            rows="6"
            placeholder="Paste your text here to check for plagiarism"
        ></textarea>
    </div>

    <!-- File Upload -->
    <div class="mb-6">
        <label for="fileUpload" class="block text-lg font-semibold mb-2">Or Upload a File:</label>
        <input
            id="fileUpload"
            type="file"
            accept=".txt, .docx, .pdf"
            on:change={handleFileUpload}
            class="file-input border rounded-lg p-3 w-full"
        />
    </div>

    <!-- Check Plagiarism Button -->
    <button
        on:click={checkPlagiarism}
        class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition mb-6"
        disabled={isChecking}
    >
        {isChecking ? 'Checking...' : 'Check Plagiarism'}
    </button>

    <!-- Plagiarism Result -->
    {#if plagiarismResult}
        <div class="plagiarism-result bg-white p-4 rounded-lg shadow-md text-center">
            <p class="text-lg font-bold mb-4">Result:</p>
            <p class="text-gray-700 text-lg">{plagiarismResult}</p>
        </div>
    {/if}
</section>
{/if}





















        <!-- Alerts Section -->
        {#if selectedView === 'alerts'}
            <section class="alerts mb-8">
                <h2 class="text-2xl font-semibold mb-6">Alerts</h2>

                <!-- Alerts Page -->
                <section class="alerts-page">
                    <h3 class="text-xl font-semibold mb-4">System Alerts</h3>
                    <div class="alerts-list bg-white p-4 rounded-lg shadow-lg">
                        {#each recentActivities.filter(activity => activity.type === 'alert') as alert (alert.id)}
                            <div class="alert-item border-b border-gray-300 p-4 last:border-none">
                                <p class="text-gray-700"><span class="font-bold">Alert:</span> {alert.description}</p>
                                <p class="text-gray-500 text-sm">{alert.date}</p>
                            </div>
                        {/each}
                    </div>
                </section>
            </section>
        {/if}
    </main>
</div>
<style>
    .input {
            background-color: #F9FAFB;
            border-color: #E5E7EB;
        }
    
        .upload-area:hover {
            background-color: #F1F5F9;
        }
    
        .loader {
            width: 40px;
            height: 40px;
            border: 4px solid #E5E7EB;
            border-top: 4px solid #3B82F6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>