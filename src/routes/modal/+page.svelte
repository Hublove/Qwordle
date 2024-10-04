<script>
    let isOpen = true;
  
    function closeModal() {
        isOpen = !isOpen; // Toggle the visibility state
        console.log(isOpen)
    }

    let email = "";
    let password = "";
    let formData = {}
    
    async function handleSubmit(event) {
        event.preventDefault();  // Prevent default form submission
        console.log("Form Data:", { email, password });

        let loginUrl = "http://localhost:8000/login"

        const formData = {
            username: 'hublove',
            password: password,
            email: email,
        };


        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Pass the formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log('API Response:', result);
                // Handle successful API response
            } else {
                console.error('API Call Failed:', response.status);
                // Handle errors
            }
            } catch (error) {
                console.error('Error making API call:', error);
                // Handle network errors or other issues
            }
        }


  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b">
            <h3 class="text-xl font-semibold">Login</h3>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" on:click={closeModal}>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <form on:submit={handleSubmit}>
                    <div class="col-span-6">
                        <label
                        for="Email"
                        class="block text-sm font-medium text-gray-700"
                        >
                        Email
                        </label>
            
                        <input
                        bind:value={email} 
                        type="email"
                        id="Email"
                        name="email"
                        class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm "
                        />
                        <!-- dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 -->
                    </div>
            
                    <div class="col-span-6 mt-1.5">
                        <label
                        for="Password"
                        class="block text-sm font-medium text-gray-700"
                        >
                        Password
                        </label>
            
                        <input
                        bind:value={password} 
                        type="password"
                        id="Password"
                        name="password"
                        class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm "
                        />
                        <!-- dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 -->
                    </div>
            
                    <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                        <button
                        type="submit"
                        class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-5 py-2.5 my-4 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                        >
                        Login
                        </button>
            
                        <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                        Don't have an account?
                        <a href="/register" class="text-gray-700 underline "
                            >Register here!</a
                        >
                        </p>
                    </div>
                </form>

                
                <!-- <p class="text-base leading-relaxed">
                </p> -->
                
            </div>
            <!-- Modal footer -->
            <!-- <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" on:click={closeModal}>I understand</button>
            </div> -->
        </div>
        </div>
    </div>
  {/if}