<script>
    import { Stage, Layer, Rect, Line } from 'svelte-konva';
    let height
    let width
    let padding = 50;
    let i = 1

    let config = { x: 0, y: 0, width: 50, height: 50, fill: 'blue', draggable: true }
    let shadowConfig = {
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

    let shadowRect

    function handleSnap(e) {
        // another way to access Konva nodes is to just use the event payload
        // console.log(e.detail.target);
        let shape = e.detail.target
        config.x = Math.round(shape.attrs.x / padding) * padding
        config.y = Math.round(shape.attrs.y / padding) * padding
        // prevent bubbling of the click event to the stage
        e.detail.cancelBubble = true;
        shadowConfig.visible = false
    }

    function handleShadowStart(e) {
        shadowConfig.visible = true
        e.detail.target.moveToTop();
    }

    function handleShadowMove(e) {
        let shape = e.detail.target

        shadowConfig.x = Math.round(shape.attrs.x / padding) * padding
        shadowConfig.y = Math.round(shape.attrs.y / padding) * padding
    }

</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height}/>



<div class="flex justify-center">
    <Stage class="border w-min" config={{ width: 600, height: 600 }}>
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
            <Rect on:dragmove={handleShadowMove} on:dragend={handleSnap} on:dragstart={handleShadowStart} config={config} />
            <Rect bind:this={shadowRect} config={shadowConfig} />
        </Layer>
    </Stage>
</div>