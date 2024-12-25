import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GlobeIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function LangSwitch() {
  const { i18n } = useTranslation();

  // Retrieve the language from localStorage or default to 'uz' (Uzbek)
  const storedLanguage = localStorage.getItem('language') || 'uz';

  const [selectedLanguage, setSelectedLanguage] = useState(storedLanguage);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    localStorage.setItem('language', lang); // Save language in localStorage
  };

  const languages = [
    { code: 'uz', name: 'Uzbek' },
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
  ];

  // On component mount, set the default language from localStorage
  useEffect(() => {
    i18n.changeLanguage(storedLanguage);
  }, [storedLanguage, i18n]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <GlobeIcon className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end" forceMount>
        {languages.map(({ code, name }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            // Highlight selected language
            className={
              code === selectedLanguage
                ? 'dark:bg-slate-800 dark:text-white bg-slate-100'
                : ''
            }
          >
            {name}
            <DropdownMenuShortcut>{code.toUpperCase()}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
