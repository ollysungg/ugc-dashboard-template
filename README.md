# UGC creator dashboard (free template)

Live demo: https://ugc-dashboard-template.vercel.app

A dashboard for UGC creators: money calendar, campaigns, ideation, film, editing,
scheduler, variations, accounts, transcribe, emails, warm-up and a batch timer.

Every number is sample data in `lib/mock.ts`. Swap those exports for real data
(supabase, your own api, a google sheet) and the pages keep working.

## what works out of the box
- every page, the sidebar and phone layout
- film: records takes with your camera and lets you download them
- timer: times ideation + filming per deal, saved in your browser
- ideation: bookmark videos and tick them off in the planner
- emails, transcribe, campaigns, scheduler: filters, copy buttons, editing the transcript

## what's look only (purple "look only" notes on the page)
These need their own hookup. The page shows how it should look and says what it needs:
- watch list scraping (outlier videos from creators you follow)
- green screen + retouch on the camera
- sending a batch to an editor
- auto-posting from the scheduler
- making variations (a render worker)
- refreshing account stats
- transcribing a link (speech-to-text)
- a real inbox for generated emails
- the warm-up chrome extension

## run it
```
npm install
npm run dev
```
Open http://localhost:3000.

## make it yours
- name + logo: `components/shell.tsx` (`Velocity Creators`, `Logo`)
- campaign logos: `public/brands`
- colours: `tailwind.config.ts` (`brand`)
- data: `lib/mock.ts`

Deploys to vercel with no settings.
