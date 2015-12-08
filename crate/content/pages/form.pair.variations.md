---
page:
    title: Form pair variations
    layout: list-blocks
data:
  - 
    ff_module-form-pair:
        - 
            id: "pair-id1"   
            items: 
              -        
                type: label
                text: "Pair default"  
              -      
                type: text  
                name: "pair-input"
        - 
            id: "pair-id1a"   
            items: 
              -        
                type: label
                modifier: heading
                text: "Pair heading"  
              -      
                type: text  
                name: "pair-input"
        - 
            id: "pair-id2a"   
            items: 
              -        
                type: radio
                value: "true"
                checked: true
                name: "pair-input2a"  
              -      
                type: label  
                text: "Pair radio (checked)"
        - 
            id: "pair-id2b"   
            items: 
              -        
                type: checkbox
                value: "true"
                disabled: true
                name: "pair-input2b"  
              -      
                type: label  
                text: "Pair checkbox (disabled)"
        - 
            id: "pair-id3"   
            modifier: fullwidth
            items:  
              -      
                type: label  
                text: "Pair fullwidth"
              -        
                type: text
                name: "pair-input3" 
        - 
            id: "pair-id3b"   
            modifier: fullwidth
            items:  
              -      
                type: label  
                modifier: heading
                text: "Pair fullwidth (heading)"
              -        
                type: text
                name: "pair-input3b" 
        - 
            id: "pair-id4"   
            modifier: constrained
            items:  
              -      
                type: label  
                text: "Pair constrained"
              -        
                type: text
                name: "pair-input4" 
        - 
            id: "pair-id5"   
            modifier: stacked
            items:  
              -      
                type: label  
                text: "Pair stacked"
              -        
                type: text
                name: "pair-input5" 
        - 
            id: "pair-id6"   
            modifier: stacked
            items:  
              -      
                type: label  
                modifier: heading
                text: "Pair stacked heading"
              -        
                type: text
                name: "pair-input6" 
        - 
            id: "pair-id7"   
            modifier: stacked-constrained
            items:  
              -      
                type: label  
                text: "Pair stacked constrained"
              -        
                type: text
                name: "pair-input7" 
        - 
            id: "pair-id8"   
            modifier: stacked-fullwidth
            items:  
              -      
                type: label  
                text: "Pair stacked fullwidth"
              -        
                type: text
                name: "pair-input8"                 
        - 
            id: "pair-id9"   
            modifier: fullwidth
            items:  
              -      
                type: label  
                text: "Pair fullwidth"
              -        
                type: select  
                name: "pair-input9"
                options:
                    - 
                        value: ab
                        text: Option one
                    - 
                        value: cb
                        text: Option two
        
---
