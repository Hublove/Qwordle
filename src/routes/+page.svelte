<script>
    import { Stage, Layer, Rect, Line } from 'svelte-konva';
    import { onMount } from 'svelte';
    import Modal from 'svelte-simple-modal';
    import Content from '$lib/Content.svelte';
    import Dice from '$lib/dice.svelte';
    import { VALID_WORDS } from '../constants.js'

    let isOpen = true;
    let isUsernameOpen = true;
  
    function closeModal() {
        isOpen = !isOpen; // Toggle the visibility state
    }

    function closeGameOver() {
        gameState.gameOver = !gameState.gameOver; // Toggle the visibility state
        isUsernameOpen = true
    }

    function closeUsernameModal() {
        isUsernameOpen = !isUsernameOpen; // Toggle the visibility state
    }

    let playerUsername = ""
    
    async function handleSubmit(event) {
        event.preventDefault();  // Prevent default form submission

        console.log(playerUsername)
        closeUsernameModal()
        

    }



    export let data

    let gameState = {gameOver: false}
    let howToPlay = {gameOver: false}
    let leaderboard = {}

    function findLongestWord(words) {
        if (words.length === 0) {
            return null; // Handle the case when the array is empty
        }

        let longestWord = words[0]; // Assume the first word is the longest

        for (let i = 1; i < words.length; i++) {
            if (words[i].length > longestWord.length) {
                longestWord = words[i]; // Update if a longer word is found
            }
        }

        return longestWord;
    }

    async function change_State() {
        let words = []
        DiceSet.forEach(dice => {
            words.push(dice.longestWord)
        });
        longestWord = findLongestWord(words)
        const response = await fetch('http://localhost:8000/putSolution', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({longestWord: longestWord, length: longestWord.length}),
            });
            console.log(response)
        
        try {
            const response = await fetch("http://localhost:8000/getLeaderboard", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                leaderboard = result.props.leaderboard
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
        
        gameState.gameOver = true
    }
    function displayHowToPlay() {
        // console.log(gameState.gameOver)
        howToPlay.gameOver = true
    }

    let tempWord = ""
    let longestWord = "" 
    let longestWords = [] 
    let showModal 
    let height
    let width
    let stageHeight
    let stageWidth
    let padding
    let i = 1
    let DiceSet = []
    let BoardState = []
    let letters = []
    const DICE_LETTERS = [
        ['M', 'M', 'L', 'L', 'B', 'Y'],
        ['V', 'F', 'G', 'K', 'P', 'P'],
        ['H', 'H', 'N', 'N', 'R', 'R'],
        ['D', 'F', 'R', 'L', 'L', 'W'],
        ['R', 'R', 'D', 'L', 'G', 'G'],
        ['X', 'K', 'B', 'S', 'Z', 'N'],
        ['W', 'H', 'H', 'T', 'T', 'P'],
        ['C', 'C', 'B', 'T', 'J', 'D'],
        ['C', 'C', 'M', 'T', 'T', 'S'],
        ['O', 'L', 'I', 'N', 'N', 'Y'],
        ['A', 'E', 'I', 'O', 'U', 'U'],
        ['A', 'A', 'E', 'E', 'O', 'O']
    ]
    
    

    // let config = { x: 0, y: 0, width: 50, height: 50, fill: 'blue', draggable: true }
    let shadowConfig

    let shadowRect
    let color_count = 0
    let oldCount = 0
    
    
    $: {
        console.log(color_count)
        // if (gameState.gameOver == false) {
        oldCount = color_count
        color_count = 0
        
        DiceSet.forEach(d => {
            if (d.fill == "orange") {
                color_count += 1
                console.log(color_count)
                console.log("a")


            }
        });

        if (tempWord.length >= longestWord.length) {
            longestWord = tempWord
            console.log("YEEPEE")
            console.log(longestWord)
        }

        if (color_count == 3 && color_count > oldCount) {
            change_State()
            // fetch('/updateLeaderboard', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         "longestWord": longestWord, 
            //         "length": 3
            //     })
            // })

            
        }

        // } else {
        //     color_count = 0

        //     DiceSet.forEach(d => {
        //         if (d.fill == "orange") {
        //             color_count += 1
        //         }
        //     });
        //     if (color_count == 3) {
        //         change_State()
        //     }

        // }

        
        
            
    }
    

    onMount(() => {
        if (width < 768) {
            padding = Math.floor(width / 14);
        } else {
            padding = Math.floor(width / 24);
        }
        stageHeight = padding*8
        stageWidth = padding*12
        for (let i = 0; i < 12; i++) {
            let new_x = i * padding
            DiceSet[i] = { x: new_x, y: 0, width: padding, height: padding, fill: 'blue', draggable: true, strokeWidth: 1, stroke: "black", longestWord: "" }
            letters[i] = DICE_LETTERS[i][Math.floor(Math.random()*DICE_LETTERS[i].length)];
            longestWords[i] = ""
        }
        shadowConfig = {
            x: 0,
            y: 0,
            width: padding,
            height: padding,
            fill: '#FF7B17',
            opacity: 0.6,
            stroke: '#CF6412',
            strokeWidth: 3,
            dash: [5, 3],
            visible: false
        }
        
        for (let i = 0; i < DiceSet.length; i++) {
            BoardState[i] = Array(8).fill(-1)
            BoardState[i][0] = i
        }

        displayHowToPlay()

	});


</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height}/>



<div class="h-screen flex flex-col justify-start  items-center ">
    <h1 on:click={change_State} class="text-4xl font-bold pt-6" >
        Qwordle
    </h1>
    <!-- <p>{data.props}</p> -->
    <!-- <form action="/logout" method="POST">
        <button type="submit" class="w-full text-start">Logout</button>
    </form> -->

    <!-- <Modal>
        <Content gameState={howToPlay} modal={"HowToPlay"}/>
    </Modal>

    <Modal>
        <Content bind:gameState={gameState} modal={"GameOver"} leaderboard={data.props}/>
    </Modal> -->

    

    <div class="h-full flex flex-col justify-center">
        <Stage class="border" config={{ width: stageWidth, height: stageHeight}}>
            <Layer>
                {#each {length: (width / padding) - 1} as _, i}
                    <Line
                    config={{
                        points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
                        tension: 0.5,
                        closed: true,
                        stroke: "#ddd",
                        strokeWidth: 1,
                    }}
                    />
                {/each}
                {#each {length: (height / padding)} as _, j}
                    <Line
                        config={{
                            points: [0, Math.round(j * padding), width, Math.round(j * padding)],
                            tension: 0.5,
                            closed: true,
                            stroke: "#ddd",
                            strokeWidth: 0.5,
                        }}
                    />
                {/each}
                
            </Layer>
            <Layer>
                <!-- <Rect on:dragmove={handleShadowMove} on:dragend={handleSnap} on:dragstart={handleShadowStart} config={config} /> -->
                
                {#each DiceSet as dice, index}
                    <Dice bind:config={dice} bind:shadowConfig={shadowConfig} id={index} height={stageHeight} width={stageWidth} {padding} {letters} {DiceSet} {BoardState} letter={letters[index]} longestWord={longestWords[index]}/>
                {/each}
                <Rect bind:handle={shadowConfig.handle} bind:this={shadowRect} config={shadowConfig} />
            </Layer>
        </Stage>
    </div>

    {#if isOpen}
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow">
                <!-- Modal header -->
                <div class="flex justify-between items-start p-4 rounded-t border-b">
                    <h3 class="text-xl font-semibold">How To Play</h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" on:click={closeModal}>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <p class="text-base leading-relaxed">
                        Use ALL 12 letters from the dice roll of the day to make words that connect. Words must have at least 3 letters. No proper nouns. Most rolls are solvable but not all.
                    </p>
                </div>
                <!-- Modal footer -->
                <!-- <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" on:click={closeModal}>I understand</button>
                </div> -->
            </div>
        </div>
    </div>
  {/if}

  



  {#if gameState.gameOver}
    {#if isUsernameOpen}
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow">
                <!-- Modal header -->
                <div class="flex justify-between items-start p-4 rounded-t border-b">
                    <h3 class="text-xl font-semibold">Submit Score?</h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" on:click={closeUsernameModal}>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <form on:submit={handleSubmit} class="mt-8 grid grid-cols-6 gap-6">
            
  
                        <div class="col-span-6">
                          <label
                            for="Email"
                            class="block text-sm font-medium text-gray-700 "
                          >
                            Username
                          </label>
              
                          <input
                            type="text"
                            id="Username"
                            name="username"
                            bind:value={playerUsername} 
                            class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                          />
                        </div>

              
                        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                          <button
                            class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 "
                          >
                            Skip
                          </button>

                          <button
                            class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 "
                          >
                            Submit
                          </button>
              
                          
                        </div>
                      </form>
                </div>
                <!-- Modal footer -->
                <!-- <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" on:click={closeModal}>I understand</button>
                </div> -->
            </div>
        </div>
        </div>
    {/if}
    {#if !isUsernameOpen}
            <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow">
                    <!-- Modal header -->
                    <div class="flex justify-between items-start p-4 rounded-t border-b">
                        <h3 class="text-xl font-semibold">How To Play</h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" on:click={closeGameOver}>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
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
                                    {#each leaderboard as row (row)}
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
                        
                            </div>
                        </section>
                    </div>
                    <!-- Modal footer -->
                    <!-- <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" on:click={closeModal}>I understand</button>
                    </div> -->
                </div>
            </div>
        </div>
    {/if}
  {/if}
</div>
