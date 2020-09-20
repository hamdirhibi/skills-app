export interface Skill {
    id : number ; 
    name : string ;     
    confirmed : string ; 
}

export const Skills = [
    {
        id : 1 , 
        name : "Angular",
        confirmed :'valid' 
    },
    {
        id : 2 , 
        name : "React",
        confirmed :'notValid'
    },
    {
        id : 3 , 
        name : "Vue",
        confirmed :'inProgress' 

    },
    {
        id : 4 , 
        name : "PHP",
        confirmed :'inProgress' 

    },
]