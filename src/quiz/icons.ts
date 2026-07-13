import {
    Atom,
    Braces,
    FileType2,
    Coffee,
    SquareCode,
    Binary,
    Database,
    Server,
    MonitorSmartphone,
    Network,
    BrainCircuit,
} from 'lucide-react';

const ICONS: Record<string, typeof Atom> = {
    react: Atom,
    javascript: Braces,
    typescript: FileType2,
    java: Coffee,
    cpp: SquareCode,
    python: Binary,
    sql: Database,
    dbms: Server,
    os: MonitorSmartphone,
    networks: Network,
    aiml: BrainCircuit,
};

export function getCategoryIcon(iconKey: string): typeof Atom {
    return ICONS[iconKey] ?? Atom;
}
