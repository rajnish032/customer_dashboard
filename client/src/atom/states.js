
import { atom } from "recoil";

export const agentData = atom({
    key: 'agentData', 
    default: null,
  });

export const shareAgentData = atom({
    key: 'shareAgentData', 
    default: null,
});

export const userData = atom({
    key: 'userData', 
    default: null,
  });

export const agentProject = atom({
    key: 'agentProject', 
    default: [],
  });

export const agentJob = atom({
  key: 'agentJob',
  default: [],
});
  
export const logData = atom({
    key: 'logData', 
    default: [],
  });
  
export const assetData = atom({
    key: 'assetData', 
    default: null,
  });

  export const PageLoader = atom({
    key: 'PageLoader', 
    default: false,
  });
  export const SidebarState = atom({
    key: 'SidebarState', 
    default: false,
  });