<script>
    import { Stage, Layer, Rect, Line } from 'svelte-konva';
    import { onMount } from 'svelte';
    import Modal from 'svelte-simple-modal';
    import Content from '$lib/Content.svelte';
    import Dice from '$lib/dice.svelte';
    import { VALID_WORDS } from '../constants.js'

    export let data

    let gameState = {gameOver: false}
    let howToPlay = {gameOver: false}

    async function change_State() {
        const response = await fetch('/updateLeaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({longestWord: "hehe", length: 4}),
            });
            console.log(response)
        
        gameState.gameOver = true
    }
    function displayHowToPlay() {
        // console.log(gameState.gameOver)
        howToPlay.gameOver = true
    }

    let tempWord = ""
    let longestWord = "" 
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
            DiceSet[i] = { x: new_x, y: 0, width: padding, height: padding, fill: 'blue', draggable: true, strokeWidth: 1, stroke: "black" }
            letters[i] = DICE_LETTERS[i][Math.floor(Math.random()*DICE_LETTERS[i].length)];
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
    <form action="/logout" method="POST">
        <button type="submit" class="w-full text-start">Logout</button>
    </form>

    <Modal>
        <Content gameState={howToPlay} modal={"HowToPlay"}/>
    </Modal>

    <Modal>
        <Content bind:gameState={gameState} modal={"GameOver"} leaderboard={data.props}/>
    </Modal>
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
                    <Dice bind:config={dice} bind:shadowConfig={shadowConfig} id={index} height={stageHeight} width={stageWidth} {padding} {letters} {DiceSet} {BoardState} letter={letters[index]}/>
                {/each}
                <Rect bind:tempWord={tempWord} bind:handle={shadowConfig.handle} bind:this={shadowRect} config={shadowConfig} />
            </Layer>
        </Stage>
    </div>
</div>
