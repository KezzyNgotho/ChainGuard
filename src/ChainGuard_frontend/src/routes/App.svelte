<script>
    import { Router, Route, Link } from 'svelte-routing';
   // import UserManagement from './routes/UserManagement.svelte';
    import Onboarding from './onboarding.svelte';
  
    // Define routes here
  </script>
  
  <Router>
   <!--  <Route path="/UserManagement" component={UserManagement} /> -->
    <Route path="/onboarding" component={Onboarding} />
    <!-- Add other routes here -->
  </Router>
  