import React from 'react';
interface SidebarNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isOpen: boolean;
    onCloseMobile?: () => void;
}
export declare const SidebarNavigation: React.FC<SidebarNavigationProps>;
export {};
//# sourceMappingURL=SidebarNavigation.d.ts.map