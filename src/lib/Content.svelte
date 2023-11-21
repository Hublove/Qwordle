<script>
    import { getContext } from 'svelte';
    import { onMount } from 'svelte';

    import HowToPlayModal from './HowToPlayModal.svelte';
    import GameOverModal from './GameOverModal.svelte';
    const { open } = getContext('simple-modal');

    export let leaderboard = {}
    export let gameState
    export let modal

    

    const showSurprise = () => {
        if (modal == "HowToPlay") {
            open(HowToPlayModal, {})
            
        } else if (modal == "GameOver") {
            open(GameOverModal, {leaderboard: leaderboard})
        }
    }
    
        
    onMount(() => {
        if (gameState.gameOver == true) {
                console.log("POWEEER")
                showSurprise()
        }
    });
    
    $: {
            if (gameState.gameOver == true) {
                console.log("POWEEER")
                showSurprise()
            }
        }
    

</script>

<!-- <p>
    <button on:click={showSurprise}>Show me a surprise!</button>
</p> -->