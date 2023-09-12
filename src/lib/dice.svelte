<script>
    import { Rect, Text } from 'svelte-konva';

    export let shadowConfig

    let config = { x: 0, y: 0, width: 50, height: 50, fill: 'blue', draggable: true }

</script>

<Rect on:dragmove={handleShadowMove} on:dragend={handleSnap} on:dragstart={handleShadowStart} config={config} />
