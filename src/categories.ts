//categories.ts
import { IconType } from 'react-icons';
import {  
  FiBriefcase, 
  FiMonitor, 
  FiServer, 
  FiKey, 
  FiLayout, 
  FiPackage, 
  FiBook, 
  FiPlusCircle, 
  FiGrid, 
  FiDatabase, 
  FiPenTool, 
  FiLayers, 
  FiFileText 
} from 'react-icons/fi';
import { FaUniversalAccess } from 'react-icons/fa';

export interface CategoryItem {
  name: string;
  icon: IconType;
}

export const categories: CategoryItem[] = [
  { name: 'Accessibility', icon: FaUniversalAccess },
  { name: 'AI', icon: FiBriefcase },
  { name: 'Animations', icon: FiMonitor },
  { name: 'API', icon: FiServer },
  { name: 'Authentication', icon: FiKey },
  { name: 'Backgrounds', icon: FiLayout },
  { name: 'Boilerplate', icon: FiPackage },
  { name: 'Books', icon: FiBook },
  { name: 'Browser Extensions', icon: FiPlusCircle },
  { name: 'Cheatsheets', icon: FiGrid },
  { name: 'CMS', icon: FiDatabase },
  { name: 'Color', icon: FiPenTool },
  { name: 'Components', icon: FiLayers },
  { name: 'Data Visualisation', icon: FiFileText },
  { name: 'Database', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  { name: 'CSS', icon: FiFileText },
  // Add more categories as needed
];