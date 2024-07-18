import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import LocaleSwitcher from '../components/locale-switcher'
import CanvasKonva from "./_components/CanvasPage"

// Client Components:

// const CanvasKonvaNoSSR = dynamic(() => import('./_components/CanvasPage'), { ssr: false })
export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div>
      <LocaleSwitcher />
        <CanvasKonva></CanvasKonva>

    </div>
  )
}
