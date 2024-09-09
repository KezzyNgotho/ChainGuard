<script>
    import { createEventDispatcher } from 'svelte';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { faHome, faFileMedical, faCalendarAlt, faComments, faShieldAlt, faWallet, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
    import '../Dashboard.scss';

    const dispatch = createEventDispatcher();

    function navigate(view) {
        dispatch('linkClick', view);
    }
</script>

<aside class="sidebar bg-gray-100 p-4 shadow-lg">
    <div class="sidebar-header mb-6">
        <h2 class="text-2xl font-bold text-gray-800">ChainGuard</h2>
    </div>

    <nav class="sidebar-nav flex-1">
        <ul class="nav-list space-y-2">
            <!-- Dashboard: Central hub for managing IPs, licenses, and payments -->
            <li>
                <a href="#" class="nav-item flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => navigate('dashboard')}>
                    <FontAwesomeIcon icon={faHome} class="icon w-6 h-6 text-gray-600" />
                    <span class="ml-3 text-gray-700">Dashboard</span>
                </a>
            </li>
            <!-- IP Registration: Register new intellectual properties -->
            <li>
                <a href="#" class="nav-item flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => navigate('ip-registration')}>
                    <FontAwesomeIcon icon={faFileMedical} class="icon w-6 h-6 text-gray-600" />
                    <span class="ml-3 text-gray-700">IP Registration</span>
                </a>
            </li>
            <!-- Marketplace: Browse and manage IPs available for licensing or sale -->
            <li>
                <a href="#" class="nav-item flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => navigate('marketplace')}>
                    <FontAwesomeIcon icon={faCalendarAlt} class="icon w-6 h-6 text-gray-600" />
                    <span class="ml-3 text-gray-700">Marketplace</span>
                </a>
            </li>
            <!-- License Management: Handle licensing details for IPs -->
            <li>
                <a href="#" class="nav-item flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => navigate('license-management')}>
                    <FontAwesomeIcon icon={faShieldAlt} class="icon w-6 h-6 text-gray-600" />
                    <span class="ml-3 text-gray-700">License Management</span>
                </a>
            </li>
            <!-- Plagiarism Detection: Monitor and manage potential IP infringements -->
            <li>
                <a href="#" class="nav-item flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => navigate('plagiarism-detection')}>
                    <FontAwesomeIcon icon={faComments} class="icon w-6 h-6 text-gray-600" />
                    <span class="ml-3 text-gray-700">Plagiarism Detection</span>
                </a>
            </li>
            <!-- Payments: Manage and view payment transactions -->
            <li>
                <a href="#" class="nav-item flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => navigate('payments')}>
                    <FontAwesomeIcon icon={faWallet} class="icon w-6 h-6 text-gray-600" />
                    <span class="ml-3 text-gray-700">Payments</span>
                </a>
            </li>
            <!-- Settings: Manage user profile, security settings, and preferences -->
            <li>
                <a href="#" class="nav-item flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => navigate('settings')}>
                    <FontAwesomeIcon icon={faCog} class="icon w-6 h-6 text-gray-600" />
                    <span class="ml-3 text-gray-700">Settings</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="sidebar-footer mt-6">
        <!-- Logout: Option for user to log out of the application -->
        <a href="#" class="nav-item flex items-center p-3 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => navigate('logout')}>
            <FontAwesomeIcon icon={faSignOutAlt} class="icon w-6 h-6 text-gray-600" />
            <span class="ml-3 text-gray-700">Logout</span>
        </a>
    </div>
</aside>
