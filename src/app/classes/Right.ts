import { Role } from "./Role";
import { RightGroups } from "./RightsGroup";

export interface Rights {
        id : number ; 
        applicationName : string ; 
        hostName : string ; 
        rightsGroupe : RightGroups ; 
}


export const RightsConst = [
        {
                id : 1 , 
                applicationName : 'app1',
                hostname : 'apache' , 
                rightsGroup : {
                        id : 1 , 
                        name : 'groupe 1' , 
                        rights  : [
                                
                        ]
                }
  
        }
        ,
        {
                id : 2 , 
                applicationName : 'app2',
                hostname : 'ngnx' , 
                rightsGroup : {
                        id : 1 , 
                        name : 'groupe 1' , 
                        rights  : [
                                
                        ]
                }
  
        },
        {
                id : 3 , 
                applicationName : 'app3',
                hostname : 'OVH' , 
                rightsGroup : {
                        id : 2 , 
                        name : 'groupe 2' , 
                        rights  : [
                                
                        ]
                }
  
        },
        {
                id : 4 , 
                applicationName : 'app4',
                hostname : 'apache' , 
                rightsGroup : {
                        id : 2 , 
                        name : 'groupe 2' , 
                        rights  : [
                                
                        ]
                }
  
        }
]