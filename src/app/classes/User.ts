import { Role } from "./Role";
import { RightGroups } from './RightsGroup';

export interface User {
    id : number ; 
    email : string ; 
    username : string ; 
    firstName : string ; 
    lastName : string ; 
    roles : Role[];
    team : User[]; 
    righsGroup : RightGroups;
}

export const Users = [
    {
        id : 1 , 
        email : 'geekrhibi@gmail.com',
        username : 'geekho',
        firstName : 'Hamdi',
        lastName : 'Rhibi' , 
        roles : [
            {
                id : 1 , 
                name : 'ROLE_ADMIN',
               
            }
        ],
        team : [
            {
                id : 2 , 
                email : 'skander@gmail.com',
                username : 'skander',
                firstName : 'skander',
                lastName : 'Rhibi' , 
                roles : [
                    {
                        id : 1 , 
                        name : 'ROLE_MANAGER',
                    
                    }
                ],
                team : [
                    {
                        id : 4 , 
                        email : 'Sob7i@gmail.com',
                        username : 'Sob7i',
                        firstName : 'Sob7i',
                        lastName : 'Rhibi' , 
                        roles : [
                            {
                                id : 1 , 
                                name : 'ROLE_USER',
                          
                            }
                        ],
                        team : [
                            
                        ],
                        rightsGroup : {
                            id : 1 , 
                            name : 'groupe 1' , 
                            rights  : [
                        ]
                    }
                    }
                ]
            },
            {
                id : 3 , 
                email : 'moez@gmail.com',
                username : 'moez',
                firstName : 'moez',
                lastName : 'Rhibi' , 
                roles : [
                    {
                        id : 1 , 
                        name : 'ROLE_USER',
                     
                    }
                ],
                team : [
                ],

                rightsGroup : {
                    id : 1 , 
                    name : 'groupe 1' , 
                    rights  : [
                ]
            }
            }
        ],
        rightsGroup : {
            id : 1 , 
            name : 'groupe 1' , 
            rights  : [
              
            ]
        }
    },
    {
        id : 2 , 
        email : 'skander@gmail.com',
        username : 'skander',
        firstName : 'skander',
        lastName : 'Rhibi' , 
        roles : [
            {
                id : 1 , 
                name : 'ROLE_MANAGER',
               
            }
        ],
        team : [
            {
                id : 4 , 
                email : 'Sob7i@gmail.com',
                username : 'Sob7i',
                firstName : 'Sob7i',
                lastName : 'Rhibi' , 
                roles : [
                    {
                        id : 1 , 
                        name : 'ROLE_USER',
                    
                    }
                ],
                team : [
                    
                ]
            }
        ],

        rightsGroup : {
            id : 1 , 
            name : 'groupe 1' , 
            rights  : [
        ]
    }
    },
    {
        id : 3, 
        email : 'moez@gmail.com',
        username : 'moez',
        firstName : 'moez',
        lastName : 'Rhibi' , 
        roles : [
            {
                id : 1 , 
                name : 'ROLE_MANAGER',
               
            }
        ],
        team : [
            
        ],

        rightsGroup : {
            id : 2 , 
            name : 'groupe 2' , 
            rights  : [
        ]
    }
    },
    {
        id : 4 , 
        email : 'Sob7i@gmail.com',
        username : 'Sob7i',
        firstName : 'Sob7i',
        lastName : 'Rhibi' , 
        roles : [
            {
                id : 1 , 
                name : 'ROLE_USER',
              
            }
        ],
        team : [
            
        ],

        rightsGroup : {
            id : 2 , 
            name : 'groupe 2' , 
            rights  : [
        ]
    }
    }
]