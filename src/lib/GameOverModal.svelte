<script>
    export let leaderboard

    console.log("MODAL")
    console.log(leaderboard)
</script>

<section class="overflow-hidden rounded-lg ">
    <div class=" max-w-full p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
        <!-- <p class="text-sm font-semibold uppercase tracking-widest">
            Run with the pack
        </p> -->
    
        <h2 class="mt-6 mb-4 font-black uppercase">
            <span class="text-4xl font-black sm:text-5xl lg:text-6xl">
            GAME OVER
            </span>
    
            <span class="mt-2 block text-sm">YOU SOLVED THE GAME!</span>
        </h2>
      
      <!--
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
-->

    <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
            <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Username
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Longest Word
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Word Length
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Solution
                </th>
            </tr>
        </thead>
    
        <tbody class="divide-y divide-gray-200">
            {#each leaderboard.leaderboard as row (row)}
                <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {row.username}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{row.longestWord}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{row.length}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        <a
                            href="#"
                            class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                            View
                        </a>
                    </td>
                </tr>
            {/each}
            
    
            
        </tbody>
        </table>
    </div>

      <!-- <a
        class="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
        href=""
      >
        POST YOUR SOLUTION
      </a> -->
      <!-- <form action="/getLeaderboard" method="GET">
        <button type="submit" class="w-full text-start">POST YOUR SOLUTION</button>
      </form> -->
  
      <!-- <p class="mt-8 text-xs font-medium uppercase text-gray-400">
        Offer valid until 24th March, 2021 *
      </p> -->
    </div>
</section>