<script>
    import { Rect, Text, Group } from 'svelte-konva';
	import { VALID_WORDS } from '../constants';
    
    export let DiceSet
    export let letters
    export let id
    export let shadowConfig
    export let padding
    export let config
    export let letter
    export let width
    export let height
    export let BoardState


    let old_x
    let old_y
    

    let textConfig = { x: config.x, y: config.y, 
                    width: padding, 
                    height: padding,
                    fill: "white", 
                    text: letter, 
                    fontSize: 15,
                    verticalAlign: "middle",
                    align: "center",
                    draggable: true,
                }
    
    let rect
    let text
    
    function haveIntersection(dice_1, dice_2) {
        let buffer = 2
        return !(
          dice_2.x > dice_1.x + dice_1.width - buffer ||
          dice_2.x + dice_2.width - buffer < dice_1.x ||
          dice_2.y > dice_1.y + dice_1.height  - buffer||
          dice_2.y + dice_2.height - buffer< dice_1.y
        );
      }

    function handleSnap(e) {
        // another way to access Konva nodes is to just use the event payload
        // console.log(e.detail.target);
        let shape = e.detail.target
        let temp_config = {
            x: Math.round(shape.attrs.x / padding) * padding,
            y: Math.round(shape.attrs.y / padding) * padding,
            width: config.width,
            height: config.height
        }
        
        // console.log(shape.attrs.x / padding)
        // console.log("true")

        for (let i = 0; i < DiceSet.length; i++) {
            let dice = DiceSet[i];

            if (haveIntersection(temp_config, dice) && id != i) {
                console.log("a")

                config.x = old_x
                console.log(config.x)

                textConfig.x = old_x
                config.y = old_y
                console.log(config.y)

                textConfig.y = old_y
                console.log(BoardState)
                break;
            } else {
                console.log("b")
                config.x = Math.round(shape.attrs.x / padding) * padding
                config.y = Math.round(shape.attrs.y / padding) * padding
                textConfig.x = Math.round(shape.attrs.x / padding) * padding
                textConfig.y = Math.round(shape.attrs.y / padding) * padding
                if (BoardState[config.x / padding][config.y / padding] == -1) {
                    BoardState[old_x / padding][old_y / padding] = -1
                    BoardState[config.x / padding][config.y / padding] = id
                }
                
                console.log(BoardState)
                
            }
        }

        
        // console.log(VALID_WORDS)
        //Checking x axis for valid word
        
        for (let j = 0; j < 12; j++) {
            DiceSet[j].fill = "blue"
        }
        for (let y_index = 0; y_index < 8; y_index++) {
            check_x_axis(y_index)
        }
        for (let x_index = 0; x_index < 12; x_index++) {
            check_y_axis(x_index)
        }
        
        //Checking y axis for valid word
        // for (let j = 0; j < 8; j++) {
        //     const element = array[j];
            
        // }

        
        // prevent bubbling of the click event to the stage
        e.detail.cancelBubble = true;
        shadowConfig.visible = false

        console.log(config)

    }

    function check_y_axis(x) {
        let word = ""
        let wordIDs = []

        for (let j = 0; j < 8; j++) {

            if (BoardState[x][j] == -1) {

                if (word.length > 2 && VALID_WORDS.has(word.toLowerCase())) {
                    for (let c = 0; c < wordIDs.length; c++) {
                        console.log(wordIDs[c])
                        DiceSet[wordIDs[c]].fill = "orange"
                    }
                }

                word = ""
                wordIDs = []

            } else {

                word += letters[BoardState[x][j]]
                wordIDs.push(BoardState[x][j])
            
                
            }

        }
        
        if (word.length > 2 && VALID_WORDS.has(word.toLowerCase())) {
            for (let c = 0; c < wordIDs.length; c++) {
                console.log(wordIDs[c])
                DiceSet[wordIDs[c]].fill = "orange"
            }
        }
    }    

    function check_x_axis(y) {
        let word = ""
        let wordIDs = []

        for (let j = 0; j < 12; j++) {

            if (BoardState[j][y] == -1) {
                

                if (word.length > 2 && VALID_WORDS.has(word.toLowerCase())) {
                    for (let c = 0; c < wordIDs.length; c++) {
                        console.log(wordIDs[c])
                        DiceSet[wordIDs[c]].fill = "orange"
                    }
                }

                word = ""
                wordIDs = []

            } else {

                word += letters[BoardState[j][y]]
                wordIDs.push(BoardState[j][y])
            
                
            }
        }
        if (word.length > 2 && VALID_WORDS.has(word.toLowerCase())) {
            for (let c = 0; c < wordIDs.length; c++) {
                console.log(wordIDs[c])
                DiceSet[wordIDs[c]].fill = "orange"
            }
        }
    }

    function handleShadowStart(e) {
        shadowConfig.visible = true
        e.detail.target.moveToTop();
        config.handle.moveToTop();
        shadowConfig.handle.moveToBottom();

        old_x = config.x
        old_y = config.y

    }

    function handleShadowMove(e) {
        let shape = e.detail.target
        e.detail.target.moveToTop();

        

        config.x = shape.attrs.x
        config.y = shape.attrs.y
        shadowConfig.x = Math.round(shape.attrs.x / padding) * padding
        shadowConfig.y = Math.round(shape.attrs.y / padding) * padding
        
        

        if (config.x < 0) {
            config.x = 0
            shadowConfig.x = 0
            textConfig.x = 0
            textConfig.y = config.y
        }
        if (config.y < 0) {
            config.y = 0
            shadowConfig.y = 0
            textConfig.y = 0
            textConfig.x = config.x
        }
        if (config.y < 0) {
            config.y = 0
            shadowConfig.y = 0
            textConfig.y = 0
            textConfig.x = config.x
        }
        if (config.x > width - padding) {
            config.x = width - padding
            shadowConfig.x = width - padding
            textConfig.x = width - padding
            textConfig.y = config.y
        }
        if (config.y > height - padding) {
            config.y = height - padding
            shadowConfig.y = height - padding
            textConfig.y = height - padding
            textConfig.x = config.x
        }

    }

    

</script>


<Rect bind:this={rect} bind:handle={config.handle} config={config} />
<Text bind:this={text} on:dragmove={handleShadowMove} on:dragend={handleSnap} on:dragstart={handleShadowStart} config={textConfig}/>
