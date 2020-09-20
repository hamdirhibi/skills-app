import { Rights } from './Right'
import { User } from './User'
export interface RightGroups {
    id : number ; 
    name : string ; 
    righs : Rights[]
    Users : User[] ; 
}

export const Groups = [
    {
        id : 1 , 
        name : 'groupe 1' , 
        rights  : [
            {
                id : 1 , 
                applicationName : 'app1',
                hostname : 'apache' , 
                rightsGroupe : {}

            },
            {
                id : 1 , 
                applicationName : 'app2',
                hostname : 'ngnx' , 
                rightsGroupe : {}

            }
        ]
    },
    {
        id : 2 , 
        name : 'groupe 2' , 
        rights  : [
            {
                id : 3 , 
                applicationName : 'app3',
                hostname : 'OVH' , 
                rightsGroupe : {}

            },
            {
                id : 4 , 
                applicationName : 'app4',
                hostname : 'apache' , 
                rightsGroupe : {}

            }
        ]
    }
]

