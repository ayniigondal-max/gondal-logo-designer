<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- `/` is the AI Logo Generator: engine-generated sample showcase (labeled as samples, never client work) → stepper → results with pricing; `/generator` redirects to `/` to keep the old URL.
- Payments: card/bank checkout shows "Coming soon"; manual receipt upload keeps downloads locked (pending verification); never collect card details, because no payment account is connected.
- Prices are USD tiers ($1/$10/$25); local currency (src/lib/currency.ts) is an estimate shown alongside, because the USD tier is the real price.
- Logo generation stays deterministic and local: typed and voice descriptions resolve into layered SVG design cues, keeping previews immediate and avoiding paid AI requests.
