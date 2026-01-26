import * as TabsPrimitive from '@radix-ui/react-tabs';
import '../styles/App.css';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} className={className}>
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <TabsPrimitive.List className={`tabs-list ${className}`}>
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger value={value} className={`tabs-trigger ${className}`}>
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  return (
    <TabsPrimitive.Content value={value} className={`tabs-content ${className}`}>
      {children}
    </TabsPrimitive.Content>
  );
}
