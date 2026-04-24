// Pre-written demo answers with realistic evaluations for every role/difficulty combo.
// Matched to the mock question bank order in backend/services/aiService.js.
// When a demo answer is submitted, the paired evaluation is used directly
// instead of calling the backend — guaranteeing realistic scores and feedback.

const demoAnswers = {
  Frontend: {
    Easy: [
      {
        answer: `HTML provides the structure and content of a webpage using elements like headings, paragraphs, and divs. CSS handles all the visual styling — colors, layout, fonts, spacing. JavaScript adds interactivity and dynamic behavior, like responding to user clicks or fetching data. They work together in layers: HTML is the skeleton, CSS is the skin, and JavaScript is the muscles. The browser parses HTML into a DOM tree, applies CSS rules to style it, and executes JavaScript to manipulate the DOM at runtime.`,
        evaluation: {
          score: 8,
          feedback: `A solid, well-structured answer that correctly explains the role of each technology and uses a helpful analogy. The skeleton/skin/muscles metaphor demonstrates clear conceptual understanding. Mentioning the DOM and runtime behavior shows you understand how the browser actually processes these technologies, not just their surface-level definitions.`,
          strengths: [
            'Clear analogy (skeleton/skin/muscles) makes the concept immediately intuitive',
            'Correctly mentions DOM parsing and runtime JavaScript execution — goes beyond surface-level definitions',
          ],
          weaknesses: [
            'Could mention how they interact in practice — e.g. JS modifying CSS classes to trigger style changes',
            'No mention of modern tooling like bundlers that compile these together in production',
          ],
          improvedAnswer: `HTML defines the semantic structure and content of a page via a DOM tree. CSS describes how that DOM should be rendered — layout, color, typography — using selectors that target elements. JavaScript manipulates the DOM and CSSOM at runtime to create interactivity. In practice, JS often toggles CSS classes rather than setting inline styles, keeping concerns separated. Modern build tools like Vite bundle and optimize all three for production, and frameworks like React blur these lines further by co-locating structure, style, and logic in components.`,
        },
      },
      {
        answer: `The CSS box model describes how every HTML element is rendered as a rectangular box made up of four layers. The innermost layer is content — the actual text or image. Surrounding it is padding, which adds transparent space inside the element's border. Next is border, which wraps the padding and content. Finally, margin creates transparent space outside the border, separating the element from its neighbors. By default browsers use content-box sizing, meaning width/height only applies to the content. Setting box-sizing: border-box makes width include padding and border, which is far more intuitive for layout work.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer that covers all four layers in order, explains the difference between content-box and border-box, and gives a practical recommendation. Mentioning box-sizing: border-box and why it's preferable demonstrates real-world experience beyond textbook knowledge. This is exactly the depth a mid-level frontend interview would expect.`,
          strengths: [
            'Accurately describes all four layers (content, padding, border, margin) in the correct order',
            'Proactively explains box-sizing: border-box and why it\'s preferable — shows practical experience',
          ],
          weaknesses: [
            'Could mention how to inspect the box model in browser DevTools — a useful practical addition',
            'No mention of how margin collapsing works, which is a common source of layout bugs',
          ],
          improvedAnswer: `The CSS box model defines every element as a box with four layers: content (the inner dimensions), padding (internal spacing), border (the visible edge), and margin (external spacing between elements). By default, width and height set only the content size (content-box). Setting box-sizing: border-box — which most modern stylesheets do globally — includes padding and border in the declared width, making layouts much more predictable. A notable quirk is margin collapsing: adjacent vertical margins merge into the larger of the two rather than adding together.`,
        },
      },
      {
        answer: `The DOM (Document Object Model) is a tree-based representation of an HTML document that the browser creates after parsing HTML. Each element becomes a node in the tree. JavaScript can access and manipulate the DOM through methods like document.querySelector() to select single elements, document.querySelectorAll() for multiple elements, and getElementById() for direct ID lookup. Once selected, you can modify content with element.textContent or element.innerHTML, change styles via element.style or classList, add/remove elements using appendChild() and remove(), and listen for events with addEventListener().`,
        evaluation: {
          score: 8,
          feedback: `Good answer that accurately defines the DOM and covers the most commonly used selection and manipulation APIs. Listing specific methods by name shows practical knowledge. The answer is well-organised, moving logically from definition to selection to manipulation to events. Could go deeper on performance implications, but this is strong for an Easy-level question.`,
          strengths: [
            'Accurately defines the DOM as a tree structure created from HTML parsing',
            'Covers the full manipulation surface: selection, content, styles, DOM mutations, and events',
          ],
          weaknesses: [
            'No mention of performance concerns with frequent DOM manipulation or why virtual DOMs exist',
            'Could distinguish between innerHTML (XSS risk) and safer alternatives like textContent',
          ],
          improvedAnswer: `The DOM is a live, tree-structured API the browser creates from parsed HTML. Each tag becomes a node. You select nodes with querySelector / querySelectorAll (CSS selectors) or getElementById. You can then read/write content via textContent (safe) or innerHTML (supports HTML but risks XSS), change classes with classList.add/remove/toggle, and respond to user actions with addEventListener. For performance, batch DOM reads and writes to avoid layout thrashing. Frameworks like React introduced a virtual DOM to minimise expensive real DOM operations through diffing.`,
        },
      },
      {
        answer: `var is function-scoped and hoisted to the top of its containing function, which can cause bugs when used inside blocks like loops. let is block-scoped and hoisted but not initialised, so accessing it before declaration throws a ReferenceError (temporal dead zone). const is also block-scoped but must be initialised at declaration and cannot be reassigned — though objects and arrays declared with const can still have their properties or elements mutated. In modern JavaScript, the best practice is to use const by default and only use let when you need to reassign.`,
        evaluation: {
          score: 9,
          feedback: `Comprehensive answer that correctly covers all three declarations, explains hoisting behaviour, and introduces the temporal dead zone — a detail many candidates miss. The practical guidance at the end (const by default, let when needed) shows good engineering judgment. This level of detail is exactly what interviewers look for on this topic.`,
          strengths: [
            'Correctly explains hoisting differences including the temporal dead zone for let/const',
            'Notes that const prevents reassignment but not mutation — a subtle but important distinction',
          ],
          weaknesses: [
            'Could give a concrete code example showing a var-in-loop bug to really nail the explanation',
            'No mention of var leaking to the global scope when declared outside any function',
          ],
          improvedAnswer: `var is function-scoped and hoisted with an initial value of undefined, meaning it's accessible (though undefined) before its declaration line — a common source of bugs in loops. let and const are block-scoped and hoisted but not initialised, creating a temporal dead zone where accessing them throws a ReferenceError. const additionally prevents reassignment after initialisation, though the referenced object's properties can still be mutated. A classic var pitfall: in a for loop with async callbacks, all callbacks share the same var variable. Using let creates a new binding per iteration. Modern style: always const, use let when reassignment is needed, avoid var.`,
        },
      },
      {
        answer: `Event bubbling is the process where an event fired on a nested element propagates upward through the DOM tree to its parent elements. For example, clicking a button inside a div also triggers click handlers on the div, then the section, then the body, and so on up to the window. You can stop bubbling with event.stopPropagation(). This behaviour is useful for event delegation — instead of attaching handlers to many child elements, you attach one handler to the parent and check event.target to identify which child was clicked. This improves performance and works for dynamically added elements.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer that explains the concept clearly, gives a concrete example of the propagation path, explains how to stop it, and — most impressively — explains event delegation as a practical application. Mentioning that delegation works for dynamically added elements shows real-world understanding. This is a near-perfect response for this question.`,
          strengths: [
            'Clearly explains the propagation path with a concrete DOM hierarchy example',
            'Demonstrates practical application through event delegation — a key interview concept',
          ],
          weaknesses: [
            'No mention of the capture phase (events propagate down before bubbling up) for complete coverage',
            'Could note that not all events bubble — focus, blur, and scroll do not bubble by default',
          ],
          improvedAnswer: `Event propagation has three phases: capture (event travels down from window to target), target (fires on the clicked element), and bubble (travels back up to window). By default, addEventListener uses the bubble phase. Clicking a nested button triggers handlers on every ancestor. stopPropagation() halts this. Event delegation leverages bubbling: attach a single listener to a parent, then inspect event.target to handle clicks on any child — this is more performant than many individual listeners and naturally handles dynamically added children. Note: not all events bubble (focus, blur, scroll don't).`,
        },
      },
    ],

    Medium: [
      {
        answer: `A closure is a function that retains access to variables from its outer (enclosing) scope even after that outer function has returned. This works because JavaScript functions carry a reference to the scope they were created in, not a copy. A classic use case is creating private state — for example, a counter function that returns an increment function. The inner function closes over the count variable, which can't be accessed from outside. Closures are also foundational to patterns like module pattern, memoization, partial application, and any callback that references outer variables.`,
        evaluation: {
          score: 8,
          feedback: `Strong answer that gives an accurate definition, explains why closures work (scope reference, not copy), and provides a concrete use case with the counter example. Listing multiple real-world patterns shows breadth. The answer could be stronger by explicitly showing the code structure, but as a verbal explanation it covers the key concepts well.`,
          strengths: [
            'Correctly explains that closures reference the scope, not a snapshot — a nuance many candidates miss',
            'Connects closures to real patterns: module pattern, memoization, partial application',
          ],
          weaknesses: [
            'No code example shown — a counter implementation would make the explanation concrete and memorable',
            'Could mention the classic closure-in-loop bug with var and how let fixes it',
          ],
          improvedAnswer: `A closure is a function bundled with its surrounding lexical scope. When an inner function is returned or passed as a callback, it retains a live reference to its outer scope's variables. Example: function makeCounter() { let n = 0; return () => ++n; } — each call to makeCounter() creates an independent n. Closures enable private state, the module pattern, memoization, and currying. The classic pitfall: using var in a loop creates closures that all reference the same variable. Using let (block-scoped) creates a fresh binding per iteration, which is usually the intended behaviour.`,
        },
      },
      {
        answer: `The virtual DOM is an in-memory JavaScript object representation of the real DOM. When state changes in a React component, React creates a new virtual DOM tree and compares it with the previous one using a diffing algorithm (called reconciliation). Only the parts that actually changed are then applied to the real DOM in a process called patching. This is more performant than naively re-rendering the entire DOM because real DOM operations are expensive — they trigger layout recalculations, style recalculations, and repaints. Batching these into minimal real DOM updates significantly improves performance for complex UIs.`,
        evaluation: {
          score: 8,
          feedback: `Good answer that covers the core concept accurately — in-memory representation, diffing, reconciliation, and patching. Explaining why real DOM operations are expensive (layout, style recalculations) shows depth. The answer is well-structured and would satisfy most interviewers. Could be strengthened by mentioning React Fiber, which is the current reconciliation implementation.`,
          strengths: [
            'Correctly identifies the three-step process: create new vDOM, diff with previous, patch real DOM',
            'Explains the performance rationale — why DOM operations are expensive',
          ],
          weaknesses: [
            'No mention of React Fiber, which replaced the original stack reconciler and enables time-slicing',
            'Could clarify that vDOM doesn\'t always win on performance — for simple apps direct DOM can be faster',
          ],
          improvedAnswer: `React's virtual DOM is a lightweight JavaScript object tree mirroring the real DOM. On each render, React produces a new vDOM tree and runs its reconciliation algorithm (React Fiber) to diff it against the previous tree. Fiber can pause, prioritise, and resume work, enabling time-slicing for complex UIs. Only the changed nodes are flushed to the real DOM, which is expensive because it triggers layout, style recalculation, and repaint. Batching minimises these. It's worth noting that vDOM isn't universally faster than direct DOM — for simple interactions it adds overhead — but it makes complex, data-driven UIs much more predictable to reason about.`,
        },
      },
      {
        answer: `CSS Flexbox is a one-dimensional layout model for distributing space among items in a row or column. You enable it by setting display: flex on a container. Key container properties include flex-direction (row or column), justify-content (alignment along the main axis — start, center, space-between, etc.), align-items (alignment on the cross axis), flex-wrap (whether items wrap to a new line), and gap for spacing. Child items can use flex-grow to claim available space proportionally, flex-shrink to control how they reduce, and flex-basis to set their initial size. I use Flexbox for navigation bars, card rows, and centering elements.`,
        evaluation: {
          score: 8,
          feedback: `Solid, comprehensive answer that covers both container and item properties with accurate descriptions. The practical examples at the end (navbars, cards, centering) show you actually use it. The answer correctly identifies Flexbox as one-dimensional, which distinguishes it from Grid. This would comfortably pass a mid-level interview.`,
          strengths: [
            'Correctly distinguishes main axis vs cross axis and maps the right properties to each',
            'Covers both container properties AND item properties (flex-grow/shrink/basis) — many answers skip the latter',
          ],
          weaknesses: [
            'No mention of when to use Grid vs Flexbox — knowing the difference shows architectural thinking',
            'Could explain the shorthand flex: 1 which is very common in practice',
          ],
          improvedAnswer: `Flexbox is a one-dimensional layout system (one axis at a time) activated by display: flex. The container controls distribution: flex-direction sets the main axis, justify-content aligns items along it (space-between, center, etc.), align-items aligns on the cross axis, flex-wrap allows multi-line layouts, and gap adds spacing. Children use the flex shorthand — flex: 1 means flex-grow:1, flex-shrink:1, flex-basis:0 — letting items share space equally. Use Flexbox for one-dimensional patterns: navbars, button groups, vertically centering content. Use CSS Grid for two-dimensional layouts like full-page structure or card grids with alignment across both axes.`,
        },
      },
      {
        answer: `React hooks let you use state and lifecycle features in functional components. useState returns a state variable and a setter function — when called, the setter triggers a re-render with the new value. useEffect runs side effects after renders; you provide a dependency array to control when it re-runs — empty array means run once on mount, specific values means re-run when they change, no array means run after every render. useContext reads from a React context without prop drilling. There are also performance hooks like useMemo and useCallback that memoize values and functions to prevent unnecessary re-renders.`,
        evaluation: {
          score: 8,
          feedback: `Well-rounded answer that covers the three most important hooks accurately and explains the dependency array behaviour of useEffect correctly. Mentioning useContext and the performance hooks (useMemo, useCallback) shows broader knowledge. This is a strong answer — the only gap is not mentioning custom hooks, which demonstrate real mastery of the concept.`,
          strengths: [
            'Correctly explains all three dependency array patterns for useEffect (mount, specific deps, every render)',
            'Goes beyond the basics to mention performance hooks — shows awareness of optimisation patterns',
          ],
          weaknesses: [
            'No mention of custom hooks — the ability to extract and reuse stateful logic is the most powerful aspect of hooks',
            'Could explain the rules of hooks (only call at top level, only in React functions) to show complete understanding',
          ],
          improvedAnswer: `Hooks let functional components use React features previously limited to class components. useState manages local state and returns [value, setter] — calling the setter schedules a re-render. useEffect runs side effects after render; its dependency array controls frequency: [] runs once (mount/unmount), [dep] runs when dep changes, omitted runs every render. Cleanup functions prevent memory leaks. useContext reads context values without prop drilling. useMemo and useCallback memoize expensive values and callbacks to prevent child re-renders. Most powerfully, you can compose these into custom hooks — reusable stateful logic that keeps components clean.`,
        },
      },
      {
        answer: `Promises represent asynchronous operations that will eventually resolve or reject. You chain .then() and .catch() handlers to handle results. Async/await is syntactic sugar built on top of Promises that lets you write async code that reads like synchronous code. You mark a function as async, then use await before any Promise to pause execution until it resolves. Error handling uses try/catch instead of .catch() chains. The key benefit is readability — deeply nested .then() chains (callback hell) become flat, linear code. Under the hood, an async function always returns a Promise, so they're fully interoperable.`,
        evaluation: {
          score: 8,
          feedback: `Accurate and well-explained answer that correctly identifies async/await as syntactic sugar over Promises, explains the readability benefit, and notes the interoperability. Mentioning callback hell as the problem being solved shows historical context and engineering judgment. A strong answer for this question.`,
          strengths: [
            'Correctly identifies that async/await is sugar over Promises and that async functions return Promises',
            'Explains the real motivation (readability, avoiding callback hell) rather than just the syntax',
          ],
          weaknesses: [
            'No mention of Promise.all() for parallel execution — awaiting in a loop is a common mistake',
            'Could explain that await can only be used inside async functions (or top-level modules)',
          ],
          improvedAnswer: `Promises represent eventual values with pending/fulfilled/rejected states, chained with .then()/.catch()/.finally(). Async/await is syntactic sugar that makes Promise-based code read synchronously. An async function always returns a Promise; await suspends the function until the awaited Promise settles, then resumes. Error handling uses try/catch. The key difference in usage: for sequential async steps, async/await is far more readable. For parallel operations, use Promise.all([p1, p2]) — awaiting in a loop is a common mistake that serialises operations unnecessarily. Top-level await is available in ES modules without wrapping in an async function.`,
        },
      },
    ],

    Hard: [
      {
        answer: `First I'd profile with React DevTools Profiler to identify which components are re-rendering unnecessarily and why. The main culprits are usually parent re-renders passing new object/array/function references as props. Solutions include React.memo to prevent child re-renders when props haven't changed, useMemo to memoize expensive computed values, and useCallback to stabilise function references. For large lists, I'd use windowing with react-window to only render visible items. Code splitting with React.lazy and Suspense reduces initial bundle size. Moving state down and colocating it closer to where it's used prevents unnecessary re-renders in unrelated parts of the tree.`,
        evaluation: {
          score: 8,
          feedback: `Strong, methodical answer that starts correctly with profiling before optimising — a sign of engineering maturity. Covers the right tools (memo, useMemo, useCallback, windowing) and understands the root cause (reference instability). The state colocation point is an underrated but important technique. A well-rounded response.`,
          strengths: [
            'Starts with profiling/measurement before optimising — demonstrates methodical engineering approach',
            'Identifies reference instability as the root cause of unnecessary re-renders — shows deep understanding',
          ],
          weaknesses: [
            'No mention of React 18 concurrent features like useTransition for deferring non-urgent updates',
            'Could discuss state management architecture — global state in context causes widespread re-renders if not carefully designed',
          ],
          improvedAnswer: `I'd start with React DevTools Profiler to measure before optimising — identify which components re-render, how often, and why. Common culprits: new object/function references created on each render causing memo comparisons to fail. Fix with useMemo (stable values), useCallback (stable functions), and React.memo on pure children. For long lists, virtualise with react-window — only render visible rows. Code-split routes with React.lazy/Suspense. Structurally, colocate state and avoid putting frequently-changing values in a single large context. In React 18, useTransition marks non-urgent updates (search filtering, etc.) so they don't block UI interactions.`,
        },
      },
      {
        answer: `Redux is best for complex apps with many components sharing state and frequent updates — its strict unidirectional data flow and DevTools make debugging time-travel easy, but it adds significant boilerplate. Context API is built-in and ideal for low-frequency global state like theme or auth — it's simple but every context consumer re-renders when the value changes, so it's not ideal for high-frequency updates. Zustand is my preferred choice for most projects — it's lightweight, minimal boilerplate, supports fine-grained subscriptions so components only re-render when their specific slice changes, and works outside React components. For server state specifically, React Query or SWR beat all of them.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer that shows genuine experience with all three options and makes opinionated, well-reasoned recommendations. The observation about Context API causing widespread re-renders is a nuance many developers miss. Mentioning React Query/SWR for server state demonstrates awareness that much "state management" is actually data fetching, which is a mature perspective.`,
          strengths: [
            'Accurately identifies Context API\'s re-render problem for high-frequency updates — a common gotcha',
            'Recommends React Query/SWR for server state, showing awareness of the distinction between client and server state',
          ],
          weaknesses: [
            'Could mention Redux Toolkit (RTK) which dramatically reduces Redux boilerplate and changes the tradeoff calculation',
            'No mention of Jotai or Recoil for atomic state management, which solves different problems than Zustand',
          ],
          improvedAnswer: `The choice depends on state type and frequency. For server state (API data), React Query or SWR are superior to any client store — they handle caching, revalidation, and loading states automatically. For client state: Context API suits infrequent global values (theme, auth user) but causes all consumers to re-render on any change, making it unsuitable for frequently-updating state. Zustand and Jotai offer fine-grained subscriptions — components subscribe to slices and only re-render when those slices change. Redux Toolkit (not vanilla Redux) is worthwhile in large teams for its predictability, time-travel debugging, and strict conventions that prevent inconsistency at scale.`,
        },
      },
      {
        answer: `The browser rendering pipeline starts with parsing — the HTML parser builds the DOM tree and the CSS parser builds the CSSOM tree. These combine into the render tree, which only includes visible nodes (display:none elements are excluded). Next is layout (reflow), where the browser calculates the exact position and dimensions of each node. Then painting converts each node to actual pixels. Finally, compositing layers are flattened and displayed. JavaScript can trigger this pipeline — changing styles forces reflow and repaint. The key optimization is to use CSS transforms and opacity for animations since they're handled by the compositor thread without triggering layout.`,
        evaluation: {
          score: 8,
          feedback: `Solid answer that correctly describes the full pipeline from parsing to compositing and names each phase accurately. The practical optimization tip about transforms/opacity is excellent and shows real-world knowledge. Good mention of JS forcing reflow. Could go deeper on layer promotion and GPU acceleration.`,
          strengths: [
            'Correctly names all pipeline stages in order: parse → render tree → layout → paint → composite',
            'Practical optimization insight about transforms/opacity bypassing layout and paint stages',
          ],
          weaknesses: [
            'No mention of layout thrashing — the specific performance problem caused by interleaving DOM reads and writes',
            'Could explain will-change CSS property for promoting elements to their own compositor layer',
          ],
          improvedAnswer: `The pipeline: HTML parsing builds the DOM; CSS parsing builds the CSSOM; they merge into the render tree (excluding non-visible nodes). Layout (reflow) calculates geometry. Paint records drawing instructions per layer. Compositing merges layers and sends to the GPU. JS can force synchronous layout — reading offsetHeight after a style change causes "layout thrashing" if done in a loop. Avoid by batching reads and writes. Animations on transform and opacity are cheapest — they run on the compositor thread, bypassing layout and paint entirely. Use will-change: transform to promote elements to their own GPU layer for complex animations, at the cost of more memory.`,
        },
      },
      {
        answer: `Code splitting breaks the bundle into smaller chunks loaded on demand. In Vite or Webpack, dynamic import() creates split points automatically. React.lazy with Suspense enables component-level splitting at the route level. Lazy loading defers loading resources until needed — images can use the loading="lazy" attribute or IntersectionObserver for custom behavior. Tree shaking eliminates dead code by analyzing ES module import/export statements at build time — only exported values that are actually imported somewhere get included. For tree shaking to work, libraries need to use ES modules (not CommonJS) and code must avoid side effects, which is declared in package.json with the sideEffects field.`,
        evaluation: {
          score: 9,
          feedback: `Comprehensive answer that correctly explains all three concepts and importantly covers implementation details — dynamic import() for code splitting, loading="lazy" and IntersectionObserver for lazy loading, and the ES module requirement and sideEffects field for tree shaking. The sideEffects detail is rarely mentioned and shows deep knowledge.`,
          strengths: [
            'Correctly explains that tree shaking requires ES modules and mentions the sideEffects package.json field',
            'Covers multiple lazy loading approaches (native attribute and IntersectionObserver)',
          ],
          weaknesses: [
            'Could mention route-based splitting as the highest-ROI application of code splitting',
            'No mention of prefetching/preloading strategies to avoid UX degradation from lazy loading',
          ],
          improvedAnswer: `Code splitting uses dynamic import() to create async bundle chunks loaded on demand. React.lazy + Suspense applies this at component level; route-based splitting (lazy loading each route) gives the best ROI. Add link rel="prefetch" hints to load likely-next chunks during idle time. Lazy loading defers resource fetching — images use loading="lazy" natively, or IntersectionObserver for custom logic. Tree shaking statically analyses ES module import/export graphs and removes unreferenced exports from the final bundle. Prerequisites: ES modules (not CJS), no side effects in module scope, and marking safe packages with "sideEffects": false in package.json. Vite does all three by default.`,
        },
      },
      {
        answer: `I'd build the modal as a React component rendered into a portal attached to document.body to avoid z-index and overflow issues. On open, focus should be trapped inside using a focus trap — tabbing from the last focusable element should cycle back to the first. The modal needs role="dialog", aria-modal="true", and aria-labelledby pointing to the modal's heading. The trigger button needs aria-expanded and aria-controls. Pressing Escape should close the modal and return focus to the element that opened it. The background overlay should have aria-hidden="true" so screen readers ignore it. Initial focus should go to the first interactive element or the modal heading.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer demonstrating genuine accessibility expertise. Covering focus trapping, focus restoration, ARIA roles, keyboard interaction (Escape), portal rendering, and initial focus placement shows you've actually built accessible modals before. This level of detail would impress any senior interviewer. Few candidates mention aria-modal="true" or the overlay's aria-hidden.`,
          strengths: [
            'Covers the complete accessibility checklist: focus trap, focus restoration, ARIA roles, keyboard handling',
            'Mentions aria-hidden on the overlay and portal rendering — details that only come from real experience',
          ],
          weaknesses: [
            'Could mention preventing body scroll when modal is open (overflow: hidden on body)',
            'No mention of animation handling — modals should respect prefers-reduced-motion media query',
          ],
          improvedAnswer: `Render the modal via ReactDOM.createPortal into document.body to escape stacking context issues. On open: set overflow:hidden on body to prevent scroll, move focus to the first interactive element, and set aria-modal="true" role="dialog" aria-labelledby={headingId}. Implement focus trapping by listening to keydown — Tab cycles forward through focusable elements, Shift+Tab cycles backward, Escape closes. On close: remove body scroll lock and return focus to the trigger button. The overlay needs aria-hidden="true". Respect prefers-reduced-motion by skipping entrance animations for users who've set that preference. Use inert attribute on background content as a focus trap alternative in modern browsers.`,
        },
      },
    ],
  },

  Backend: {
    Easy: [
      {
        answer: `REST (Representational State Transfer) is an architectural style for designing networked APIs. Its six constraints are: client-server separation (frontend and backend are independent), statelessness (each request contains all information needed, server stores no session), cacheability (responses can be cached), uniform interface (standard methods and resource URLs), layered system (client doesn't know if it's talking directly to the server or through proxies), and code on demand (optional — server can send executable code). The uniform interface constraint is the most important — it means using HTTP methods semantically: GET to read, POST to create, PUT/PATCH to update, DELETE to remove resources.`,
        evaluation: {
          score: 8,
          feedback: `Strong answer that correctly lists all six constraints — most candidates only name three or four. Calling out the uniform interface as most important and mapping it to HTTP methods shows practical understanding. The answer is accurate and well-structured for an Easy-level question.`,
          strengths: [
            'Correctly identifies and explains all six REST constraints — most candidates miss code on demand and layered system',
            'Connects the uniform interface constraint to practical HTTP method semantics',
          ],
          weaknesses: [
            'Could clarify the difference between stateless REST and stateful sessions — why statelessness enables horizontal scaling',
            'No mention of HATEOAS (hypermedia as the engine of application state), which is the full expression of the uniform interface constraint',
          ],
          improvedAnswer: `REST is an architectural style with six constraints. Statelessness is the most operationally significant — every request is self-contained (auth via JWT/API key in headers), enabling horizontal scaling since any server can handle any request. Client-server decoupling lets frontend and backend evolve independently. Cacheability (via HTTP Cache-Control headers) reduces server load. The uniform interface standardises interaction: resources are nouns in URLs (/users/:id), HTTP methods are verbs (GET/POST/PUT/PATCH/DELETE), and responses use standard status codes (200/201/204/400/401/404/500). Layered system allows load balancers and CDNs transparently. Code on demand (optional) allows sending executable scripts.`,
        },
      },
      {
        answer: `SQL databases are relational — data is stored in tables with predefined schemas and relationships enforced by foreign keys. They use SQL and support ACID transactions, making them ideal for financial data or anything requiring data integrity. NoSQL databases use flexible schemas and come in several types: document stores like MongoDB store JSON-like documents, key-value stores like Redis are extremely fast for caching, column-family stores like Cassandra excel at time-series data, and graph databases like Neo4j are built for relationship queries. I'd choose SQL when data is relational and consistency matters, NoSQL when I need flexible schemas, horizontal scaling, or high write throughput.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer that not only contrasts SQL and NoSQL but correctly categorises NoSQL types with specific examples for each. The decision framework at the end (when to use which) is exactly what interviewers want to hear — it shows you understand tradeoffs rather than just definitions. One of the stronger answers possible for this question.`,
          strengths: [
            'Correctly categorises NoSQL into four types with real database examples for each category',
            'Provides a clear decision framework — SQL for relational/ACID needs, NoSQL for flexibility/scale',
          ],
          weaknesses: [
            'No mention of NewSQL databases (CockroachDB, Spanner) that offer SQL semantics with horizontal scaling',
            'Could explain the specific consistency tradeoffs — SQL\'s ACID vs NoSQL\'s eventual consistency',
          ],
          improvedAnswer: `SQL (relational) databases enforce schema, referential integrity, and ACID transactions — ideal for financial systems, ERP, or any domain where data correctness is non-negotiable. NoSQL trades some consistency guarantees for flexibility and scale: document stores (MongoDB) suit nested, variable-structure data; key-value stores (Redis) provide sub-millisecond lookups; wide-column stores (Cassandra) handle massive write throughput with time-series data; graph DBs (Neo4j) make relationship traversals efficient. The choice depends on consistency requirements (ACID vs eventual), query patterns (flexible JSON vs complex joins), and scale needs. Modern NewSQL systems like CockroachDB offer horizontal scaling with full ACID compliance.`,
        },
      },
      {
        answer: `The main HTTP methods are GET (retrieve a resource, should be idempotent and safe — no side effects), POST (create a new resource, not idempotent), PUT (replace a resource entirely, idempotent), PATCH (partially update a resource), DELETE (remove a resource, idempotent), and OPTIONS (returns supported methods for a resource, used by CORS preflight). Idempotent means calling the same request multiple times has the same effect as calling it once. GET and DELETE are safe bets for caching and retrying. POST should only be used when you're genuinely creating something, not as a catch-all.`,
        evaluation: {
          score: 8,
          feedback: `Good answer that covers all major methods, correctly identifies idempotency, and even mentions OPTIONS and its CORS usage — a detail most candidates skip. The practical guidance at the end is valuable. Could be improved by explaining safe vs idempotent as distinct concepts.`,
          strengths: [
            'Correctly defines idempotency and applies it to the right methods',
            'Mentions OPTIONS and CORS preflight — shows awareness beyond CRUD operations',
          ],
          weaknesses: [
            'Conflates "safe" and "idempotent" — GET is both safe AND idempotent; DELETE is idempotent but not safe',
            'No mention of HEAD (like GET but no body) which is useful for checking resource existence',
          ],
          improvedAnswer: `HTTP methods define the intended operation on a resource. GET retrieves (safe + idempotent — no side effects, same result every time). POST creates (neither safe nor idempotent — each call may create a new resource). PUT replaces entirely (idempotent — same payload always produces the same state). PATCH partially updates (not necessarily idempotent). DELETE removes (idempotent — deleting a deleted resource is a no-op). Safe means no server state changes; idempotent means repeated calls produce the same outcome. OPTIONS describes available methods and is used in CORS preflight. HEAD returns GET headers without a body — useful for cache validation or checking if a resource exists without downloading it.`,
        },
      },
      {
        answer: `Middleware in Express are functions that sit in the request-response cycle and have access to req, res, and the next function. When called, they can modify the request or response objects, execute code, end the request-response cycle, or call next() to pass control to the next middleware. They run in the order they're defined with app.use(). Common examples include logging middleware that records every request, authentication middleware that verifies JWT tokens before protected routes, error handling middleware (which takes four parameters: err, req, res, next), body parsers that parse JSON or form data, and CORS middleware that sets response headers.`,
        evaluation: {
          score: 8,
          feedback: `Accurate and well-rounded answer. Correctly explaining the three parameters (req, res, next) and the four-parameter signature for error handling middleware shows real Express knowledge. The practical examples help ground the explanation. A strong answer for this level.`,
          strengths: [
            'Correctly identifies the four-parameter signature for error handling middleware — a detail many miss',
            'Explains the execution order and the role of next() clearly',
          ],
          weaknesses: [
            'No mention of router-level middleware vs application-level middleware — the difference matters in larger apps',
            'Could mention that forgetting to call next() hangs the request — a common beginner mistake',
          ],
          improvedAnswer: `Express middleware are functions with the signature (req, res, next) that form a pipeline for every incoming request. Each middleware can read/modify req and res, perform async operations, short-circuit by sending a response, or call next() to continue. Order of registration with app.use() determines execution order. Application-level middleware runs on all routes; router-level middleware applies to a specific router instance. Error-handling middleware has the signature (err, req, res, next) and only runs when next(err) is called. Common middleware: helmet (security headers), cors, express.json() (body parsing), morgan (logging), and custom JWT verification. Forgetting next() in non-terminal middleware hangs the connection silently.`,
        },
      },
      {
        answer: `Authentication is verifying who you are — confirming your identity through credentials like username/password, biometrics, or tokens. Authorization is verifying what you're allowed to do — checking if the authenticated identity has permission to access a specific resource or perform an action. They always happen in that order: you can't authorize an unknown user. For example, logging in is authentication. Checking whether a logged-in user can delete another user's post is authorization. In an Express API, authentication middleware verifies the JWT token, attaches the user to req.user, and then authorization checks req.user.role to determine what actions are permitted.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer with a clear distinction, the correct ordering dependency, a concrete practical example, and a direct mapping to Express middleware implementation. The req.user.role example is particularly effective — it shows you understand how these concepts translate to actual code in a backend system.`,
          strengths: [
            'Clearly explains the ordering dependency — authorization requires authentication first',
            'Gives a concrete code-level example (req.user, req.user.role) that maps the concept to implementation',
          ],
          weaknesses: [
            'Could mention OAuth and OpenID Connect as industry-standard auth protocols',
            'No mention of RBAC (role-based) vs ABAC (attribute-based) as different authorization models',
          ],
          improvedAnswer: `Authentication answers "who are you?" — verifying identity via credentials, tokens, or biometrics. Authorization answers "what can you do?" — checking permissions for an authenticated identity. Authentication always precedes authorization. In an Express JWT flow: auth middleware verifies the token signature, decodes the payload, fetches the user, and attaches them to req.user. Route-level authorization middleware then checks req.user.role or req.user.permissions against the required permission for that resource. Common models: RBAC (role-based — admin/user/viewer) for most apps; ABAC (attribute-based) for fine-grained resource-level rules. OAuth 2.0 handles authentication delegation (sign in with Google); the JWT it issues is then used for authorization in your API.`,
        },
      },
    ],

    Medium: [
      {
        answer: `A database index is a separate data structure (usually a B-tree) that maps column values to the row locations, similar to a book's index. Without an index, the database does a full table scan — O(n). With an index, lookups are O(log n). Indexes are automatically created on primary keys and unique constraints. You should add indexes on columns used in WHERE clauses, JOIN conditions, and ORDER BY clauses that are queried frequently. However, indexes hurt write performance because they must be updated on every INSERT, UPDATE, and DELETE. They also consume storage. Avoid indexing low-cardinality columns like booleans — the database may not use the index if too many rows match.`,
        evaluation: {
          score: 9,
          feedback: `Strong answer that covers the data structure (B-tree), the performance complexity improvement, when to add indexes, and — critically — when they hurt performance. The cardinality point about boolean columns is excellent. This answer demonstrates the kind of nuanced understanding that distinguishes mid-level from senior engineers.`,
          strengths: [
            'Correctly explains B-tree structure and O(n) vs O(log n) complexity improvement',
            'Explains write performance penalties and low-cardinality index inefficiency — shows awareness of tradeoffs',
          ],
          weaknesses: [
            'No mention of composite indexes and how column order within them matters for query coverage',
            'Could mention covering indexes, where all queried columns are in the index, eliminating table access entirely',
          ],
          improvedAnswer: `Indexes are auxiliary data structures (typically B-trees) the DB maintains alongside tables. They map column values to row locations, turning full table scans O(n) into O(log n) lookups. Every primary key and unique constraint auto-creates one. Add indexes on WHERE, JOIN, and ORDER BY columns that appear in slow, frequent queries — confirm with EXPLAIN/EXPLAIN ANALYZE. Composite indexes cover multi-column conditions; column order matters — a (a,b) index supports queries on a alone but not b alone. Covering indexes include all SELECTed columns in the index, eliminating the main table read entirely. Downsides: each index slows writes (INSERT/UPDATE/DELETE must update all indexes) and consumes disk. Remove unused indexes.`,
        },
      },
      {
        answer: `JWT (JSON Web Token) authentication works by having the server issue a signed token after successful login. The token has three parts: header (algorithm), payload (user data like id and role), and signature (HMAC of header+payload with a secret key). The client stores this token and sends it in the Authorization header as Bearer token on subsequent requests. The server verifies the signature using its secret key — no database lookup needed, making it stateless and scalable. The payload is base64-encoded, not encrypted, so sensitive data shouldn't go in it. Tokens have an expiry (exp claim) and can't be invalidated server-side without a denylist, which is the main drawback compared to sessions.`,
        evaluation: {
          score: 9,
          feedback: `Excellent, production-aware answer. Correctly explains JWT structure, the stateless verification mechanism, and — most importantly — explicitly mentions the security implications: payload isn't encrypted, and token invalidation is the core weakness. Mentioning the denylist workaround shows you've thought through the practical challenges.`,
          strengths: [
            'Correctly notes that the payload is base64-encoded (not encrypted) — an important security consideration',
            'Identifies token invalidation as the core JWT weakness and mentions the denylist workaround',
          ],
          weaknesses: [
            'Could mention refresh token pattern as the standard solution for balancing short-lived access tokens with good UX',
            'No mention of where to store JWTs client-side and the tradeoffs (localStorage vs httpOnly cookie)',
          ],
          improvedAnswer: `After successful login, the server signs a JWT with a secret (HS256) or private key (RS256): header.payload.signature, all base64url-encoded. The payload carries claims (sub, role, exp) but is not encrypted — never put secrets in it. The client sends the token as Authorization: Bearer {token}. The server verifies the signature locally without a database round-trip, enabling stateless horizontal scaling. The main limitation: JWTs can't be invalidated before expiry without a server-side denylist, which reintroduces statefulness. The standard pattern: short-lived access tokens (15m) + long-lived refresh tokens stored in httpOnly cookies (prevents XSS access). On expiry, the refresh token exchanges for a new access token silently.`,
        },
      },
      {
        answer: `For a blog API I'd structure resources around the main entities: GET /posts (list all, with query params for pagination and filtering), POST /posts (create), GET /posts/:id, PUT /posts/:id, DELETE /posts/:id. For nested resources: GET /posts/:id/comments, POST /posts/:id/comments, DELETE /posts/:postId/comments/:commentId. User-related: POST /auth/register, POST /auth/login, GET /users/:id/posts. I'd use JWT for authentication, 401 for unauthenticated requests, 403 for unauthorized actions, and 404 for not found. Responses would use a consistent envelope with data and error fields, and I'd version the API with /api/v1 prefix to allow future changes without breaking clients.`,
        evaluation: {
          score: 8,
          feedback: `Well-structured answer that correctly models the main resources, uses proper HTTP methods, handles nested resources, maps the right status codes to the right scenarios, and shows forward-thinking with API versioning. The consistent response envelope is a mature practice. A strong practical answer.`,
          strengths: [
            'Correctly models nested resources (/posts/:id/comments) as a sub-resource pattern',
            'Mentions API versioning (/api/v1) and consistent response envelopes — production-ready thinking',
          ],
          weaknesses: [
            'No mention of pagination implementation (cursor-based vs offset-based) and why cursor-based is preferable for real-time feeds',
            'Could discuss rate limiting and caching headers (ETag, Cache-Control) as important API design considerations',
          ],
          improvedAnswer: `Blog API design: resources as nouns, HTTP methods as verbs. /api/v1/posts (GET list, POST create), /api/v1/posts/:id (GET, PUT, DELETE). Nested: /posts/:id/comments (GET, POST), /posts/:id/comments/:cid (DELETE). Auth: POST /auth/register, /auth/login, /auth/refresh. Status codes: 200 (success), 201 (created), 204 (deleted), 400 (validation error), 401 (unauthenticated), 403 (forbidden), 404 (not found), 429 (rate limited). Use cursor-based pagination (?cursor=&limit=) over offset for posts (stable under concurrent writes). Add ETag headers for conditional GETs. Return a consistent envelope: { data, meta, error }. Version with /api/v1 from day one — retrofitting versioning is painful.`,
        },
      },
      {
        answer: `The N+1 problem occurs when you fetch a list of N items, then make an additional database query for each item — resulting in N+1 total queries. For example, fetching 100 posts then querying the author for each post makes 101 queries. In SQL, the fix is using JOIN to fetch posts and authors in one query, or using an ORM's eager loading (include in Sequelize, populate in Mongoose). In Mongoose specifically, it's tempting to call .populate() in a loop, which causes N+1. You detect it by logging queries or using an APM tool — suddenly seeing hundreds of queries for a simple list endpoint is the symptom.`,
        evaluation: {
          score: 8,
          feedback: `Good answer with a concrete example, correct solutions for both SQL (JOIN) and ORM (eager loading), and practical advice on detection. Calling out the Mongoose populate-in-a-loop antipattern specifically shows real-world experience. A solid response.`,
          strengths: [
            'Concrete example (100 posts + 100 author queries = 101 queries) makes the problem immediately clear',
            'Mentions both the SQL and ORM solutions, and flags the specific Mongoose antipattern',
          ],
          weaknesses: [
            'No mention of the DataLoader pattern (used in GraphQL) for batching and caching N+1 queries at the application layer',
            'Could mention that even with eager loading, fetching too many associations can cause a different problem — overfetching',
          ],
          improvedAnswer: `N+1 occurs when code fetches a collection, then executes an additional query per item. Example: SELECT * FROM posts returns 50 rows; then a loop runs SELECT * FROM users WHERE id = ? 50 times. Total: 51 queries instead of 1. SQL solution: JOIN posts and users in one query or use subqueries. ORM solution: use eager loading (Mongoose .populate() on the initial query, not in a loop; Sequelize include: []). In GraphQL, the DataLoader pattern batches all individual lookups within a single tick into one WHERE id IN (...) query. Detect with query logging (Mongoose debug: true, Sequelize logging: console.log) or APM tools — a list endpoint making 100+ queries is the telltale sign.`,
        },
      },
      {
        answer: `Vertical scaling means upgrading a single server's hardware — more CPU, RAM, or faster storage. It's simple — no code changes needed — but has a hard ceiling (there's only so big a server you can buy) and single point of failure. Horizontal scaling means adding more servers and distributing load across them with a load balancer. It has virtually unlimited ceiling and provides redundancy, but requires your application to be stateless — any server must be able to handle any request. Sessions must be stored externally (Redis), file uploads need shared storage (S3), and background jobs need a queue. Most production systems start vertical and move horizontal when they hit limits.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer that correctly defines both approaches and — importantly — explains the architectural constraints horizontal scaling imposes (statelessness, external session storage, shared file storage, queues). This shows you understand it's not just an infrastructure decision but an application architecture decision. Very strong response.`,
          strengths: [
            'Correctly identifies the statelessness requirement and its specific implications (Redis sessions, S3 uploads, queues)',
            'Practical advice to start vertical then go horizontal mirrors real-world engineering decision-making',
          ],
          weaknesses: [
            'Could mention database scaling specifically — read replicas for horizontal reads, sharding for horizontal writes',
            'No mention of auto-scaling groups (AWS ASG, GCP MIG) as the modern horizontal scaling implementation',
          ],
          improvedAnswer: `Vertical scaling (scale up) adds resources to one machine — more CPU/RAM. Simple, no code changes, but has hardware limits and a single point of failure. Horizontal scaling (scale out) adds more machines behind a load balancer. Near-unlimited ceiling and built-in redundancy, but requires stateless application design: no in-memory sessions (use Redis), no local file storage (use S3), and shared background job queues (BullMQ, SQS). Databases scale horizontally via read replicas (distribute read load) and sharding (partition write load). Modern infrastructure uses auto-scaling groups that spin instances up/down based on load metrics. Strategy: scale vertically first (simple, cheap), architect for horizontal from the start, scale out when vertical limits are reached.`,
        },
      },
    ],

    Hard: [
      {
        answer: `I'd use Redis with a sliding window or token bucket algorithm. Each incoming request checks a Redis key like rate:userId or rate:ip, increments an atomic counter using INCR, and sets an expiry if it's the first request in the window. If the counter exceeds the limit, reject with 429. For distributed systems, Redis is the right choice because all server instances share one data store. The key challenge is ensuring atomic check-and-increment to prevent race conditions — use Redis Lua scripts or MULTI/EXEC transactions. For sliding windows, I'd use a sorted set with request timestamps, trimming entries older than the window and checking the count.`,
        evaluation: {
          score: 8,
          feedback: `Strong answer that identifies Redis as the right data store, explains both fixed window and sliding window approaches, and — critically — identifies the race condition problem and its solution (Lua scripts/transactions). The sorted set approach for sliding windows is correct. A well-informed response.`,
          strengths: [
            'Correctly identifies the race condition issue and proposes atomic solutions (Lua scripts, transactions)',
            'Explains both fixed window (INCR + expire) and sliding window (sorted set) implementations',
          ],
          weaknesses: [
            'No mention of different rate limit tiers (per user vs per IP vs per API key) and how to combine them',
            'Could discuss what to do when Redis is down — fail open or fail closed — which is a real production consideration',
          ],
          improvedAnswer: `Redis is the standard choice for distributed rate limiting — all app instances share one atomic store. Fixed window: INCR rate:{userId}:{window} on each request, SET expiry on first increment, reject with 429 if count exceeds limit. Problem: burst at window boundaries. Sliding window using a sorted set: ZADD rate:{userId} {timestamp} {requestId}, ZREMRANGEBYSCORE to remove old entries, ZCARD to count — all in a Lua script for atomicity. Token bucket (leaky bucket) is better for smooth enforcement: store {tokens, lastRefill} in a hash, calculate token delta on each request. Apply multiple limits (per-IP, per-user, per-API-key) hierarchically. Redis failure strategy: fail open (allow requests) for user-facing features; fail closed (block) for payment endpoints.`,
        },
      },
      {
        answer: `ACID stands for Atomicity (all operations in a transaction succeed or all fail), Consistency (the database moves from one valid state to another), Isolation (concurrent transactions don't interfere with each other), and Durability (committed data survives failures). CAP theorem says a distributed system can only guarantee two of three: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition tolerance (the system works despite network splits). Since partition tolerance is non-negotiable in distributed systems, the real tradeoff is CP (consistent but may be unavailable during partitions — like HBase) or AP (available but eventually consistent — like Cassandra).`,
        evaluation: {
          score: 8,
          feedback: `Accurate explanation of both concepts and correctly identifies that partition tolerance is effectively mandatory, making the real choice CP vs AP. Providing database examples (HBase for CP, Cassandra for AP) grounds the theory in reality. A strong answer that shows the ability to apply theory to system design decisions.`,
          strengths: [
            'Correctly identifies that partition tolerance is non-negotiable, reframing CAP as a CP vs AP choice',
            'Maps real databases to their CAP positions (HBase → CP, Cassandra → AP)',
          ],
          weaknesses: [
            'No mention of PACELC theorem, which extends CAP to also consider latency/consistency tradeoffs when the network is not partitioned',
            'Could elaborate on isolation levels (read committed, repeatable read, serializable) which are where ACID meets real implementation',
          ],
          improvedAnswer: `ACID ensures correctness within a single database node. Atomicity: all-or-nothing transactions. Consistency: only valid states are written (constraints, cascades). Isolation: concurrent transactions appear sequential — enforced at different levels (read committed, repeatable read, serializable) with increasing performance cost. Durability: writes survive crashes via WAL (write-ahead log). CAP applies to distributed systems: Consistency (all nodes return current data), Availability (all requests get non-error responses), Partition tolerance (works during network splits). P is non-negotiable — networks fail. So: CP systems (etcd, Zookeeper, HBase) refuse availability during partitions to maintain consistency. AP systems (Cassandra, DynamoDB) return potentially stale data during partitions. PACELC extends this: even without partitions, there's an inherent Latency vs Consistency tradeoff.`,
        },
      },
      {
        answer: `I'd split the platform into services: order-service, inventory-service, user-service, payment-service, and notification-service. Services communicate asynchronously via a message broker like Kafka or RabbitMQ — for example, when order-service creates an order, it publishes an OrderCreated event. inventory-service and payment-service subscribe and process independently. For data consistency, I'd use the Saga pattern — each service has a local transaction and publishes events; compensating transactions roll back on failure. Each service has its own database (database-per-service pattern) to ensure loose coupling. A BFF (Backend for Frontend) API gateway aggregates responses for the frontend. The hardest problem is distributed transactions — Saga handles it at the cost of eventual consistency.`,
        evaluation: {
          score: 9,
          feedback: `Excellent system design answer that names specific services, chooses appropriate communication (async messaging for most, sync for some), correctly identifies the Saga pattern for distributed transactions, and honestly addresses the main tradeoff (eventual consistency). The database-per-service mention shows awareness of microservice data isolation principles.`,
          strengths: [
            'Correctly identifies Saga pattern with compensating transactions for distributed data consistency',
            'Applies database-per-service principle and explains why (loose coupling)',
          ],
          weaknesses: [
            'No mention of service discovery or how services find each other in a dynamic environment',
            'Could discuss event sourcing as a complementary pattern to Saga for maintaining an audit trail',
          ],
          improvedAnswer: `Core services: user, catalog, inventory, order, payment, notification. Sync (REST/gRPC) for user-facing queries needing immediate responses; async (Kafka) for cross-service workflows. Order flow: order-service publishes OrderCreated → inventory-service reserves stock (publishes StockReserved) → payment-service charges card (publishes PaymentProcessed) → notification-service sends email. Each service owns its database (PostgreSQL, MongoDB, or Redis as appropriate). Distributed consistency via Choreography-based Saga: each service reacts to events; on failure, compensating events (StockReleased, PaymentRefunded) undo prior steps. API Gateway (Kong or custom BFF) handles auth, rate limiting, and response aggregation. Service discovery via Consul or Kubernetes DNS. Outbox pattern ensures events are published atomically with local DB writes.`,
        },
      },
      {
        answer: `For a large table, I'd never do an ALTER TABLE directly in production — it locks the table. Instead I'd use an expand-contract (dual write) migration. First, add the new column as nullable with no constraints — this is fast and non-blocking. Deploy app code that writes to both old and new columns. Run a background job to backfill existing rows in small batches with delays to avoid overwhelming the database. Once backfill is complete, add constraints and indexes concurrently (CREATE INDEX CONCURRENTLY in Postgres). Deploy code that reads from the new column. Finally, drop the old column. The whole process takes days for a large table but the app stays online throughout. Tools like pt-online-schema-change or gh-ost handle this for MySQL.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer demonstrating real production database migration experience. The expand-contract pattern is the correct approach, and explaining each phase (add nullable → dual write → backfill in batches → add constraints → cut over → drop old) shows you've done this or deeply studied it. Mentioning CREATE INDEX CONCURRENTLY and gh-ost/pt-osc are strong details.`,
          strengths: [
            'Correctly describes the expand-contract (dual write) pattern with all phases in the right order',
            'Mentions CREATE INDEX CONCURRENTLY and gh-ost/pt-osc — production-grade tooling knowledge',
          ],
          weaknesses: [
            'Could mention feature flags as a way to control the cutover between old and new column reads',
            'No mention of how to monitor the migration progress and how to pause/resume the backfill if it causes load spikes',
          ],
          improvedAnswer: `Never ALTER a live large table directly — it acquires a lock. Use expand-contract: (1) Add new nullable column with no constraints — online, instant. (2) Deploy code with dual writes (write to both columns). (3) Backfill in batches: UPDATE ... WHERE id BETWEEN ? AND ? LIMIT 1000 with sleep intervals; monitor DB load and pause if needed. (4) Once backfilled, add NOT NULL constraint (fast in Postgres 12+ which checks page-by-page), create indexes CONCURRENTLY. (5) Use a feature flag to switch reads to the new column. (6) Drop old column after monitoring confirms no rollback needed. For MySQL, gh-ost or pt-online-schema-change manage this with a shadow table. Track migration progress in a dedicated migrations_log table. Full process: days to weeks for 100M+ rows.`,
        },
      },
      {
        answer: `I'd build this with WebSockets via Socket.io for persistent connections, scaled horizontally using the Redis pub/sub adapter. When a user connects, they join rooms based on their subscriptions. When an event occurs (new message, order update), the relevant service publishes to a Redis channel. All Socket.io instances subscribed to that channel broadcast to connected clients in the appropriate room. For users who are offline, events go to a notification queue processed by a worker that sends push notifications (FCM/APNs), emails, or SMS. I'd use a fanout architecture for broadcast notifications and targeted delivery for personal notifications. The database stores notification history for when users come back online.`,
        evaluation: {
          score: 8,
          feedback: `Strong architecture answer that correctly identifies the horizontal scaling challenge (Redis adapter for Socket.io), handles both online and offline users, and distinguishes between fanout and targeted delivery patterns. The push notification fallback for offline users shows product thinking alongside technical depth.`,
          strengths: [
            'Correctly identifies Redis pub/sub adapter as the solution for horizontally-scaled WebSocket servers',
            'Handles both online (WebSocket) and offline (push/email/SMS queue) notification paths',
          ],
          weaknesses: [
            'No mention of connection management at scale — how to handle reconnections, heartbeats, and graceful degradation',
            'Could discuss long-polling or Server-Sent Events as fallbacks for environments where WebSockets are blocked',
          ],
          improvedAnswer: `Architecture layers: (1) WebSocket tier — Socket.io servers with Redis adapter (ioredis) for cross-instance pub/sub. Users connect and subscribe to channels (userId, topicId). (2) Event ingestion — services publish events to Kafka topics. A notification service consumes, enriches with user preferences, and routes: online users get WebSocket push via Redis pub/sub; offline users get queued for async delivery. (3) Async delivery workers — send FCM/APNs (mobile push), email (SES/SendGrid), or SMS (Twilio) based on user preferences and notification priority. (4) Persistence — store all notifications in DB with read status; serve history on reconnect. For 1M concurrent connections, shard Socket.io servers by user ID range, use sticky sessions at the load balancer (or Redis to find the right shard), and implement heartbeat/reconnection logic with exponential backoff.`,
        },
      },
    ],
  },

  'Full Stack': {
    Easy: [
      {
        answer: `The client-server model separates concerns between the user-facing client (browser) and the backend server. When you type a URL and press enter, the browser resolves the domain to an IP via DNS, establishes a TCP connection, and sends an HTTP request with a method (GET), headers (Accept, Cookie), and optionally a body. The server receives it, processes it through middleware and route handlers, queries the database if needed, and sends back an HTTP response with a status code, headers (Content-Type, Set-Cookie), and a body (HTML, JSON, etc.). The browser renders HTML or parses JSON depending on the content type. For single-page apps, the initial load gets HTML+JS, and subsequent interactions use AJAX to fetch JSON without full page reloads.`,
        evaluation: {
          score: 8,
          feedback: `Solid end-to-end explanation that correctly traces the flow from DNS resolution through TCP, HTTP request/response, middleware, database, and browser rendering. The SPA distinction at the end adds real value. A comprehensive answer for an Easy question.`,
          strengths: [
            'Correctly traces the full flow including DNS resolution and TCP connection establishment',
            'Distinguishes between traditional server-rendered and SPA request patterns',
          ],
          weaknesses: [
            'No mention of HTTPS/TLS handshake, which is now standard and interviewers often expect',
            'Could mention CDNs as a layer between client and origin server',
          ],
          improvedAnswer: `Client-server: browser (client) requests resources from a server over HTTP(S). Flow: browser checks DNS cache → queries DNS resolver for IP → establishes TCP connection → TLS handshake (for HTTPS) → sends HTTP request (method, headers, body). Server receives request → middleware chain (auth, logging, body parsing) → route handler → ORM/DB query → builds response → sends HTTP response (status, headers, body). Browser receives response: HTML → parse DOM + CSSOM → render; JSON → processed by JavaScript. In SPAs, the initial request gets a shell HTML + JS bundle; subsequent user interactions fire fetch/XHR calls that return JSON, updating the DOM without full reloads. CDNs sit between client and origin, serving cached responses from edge nodes geographically close to users.`,
        },
      },
      {
        answer: `CORS (Cross-Origin Resource Sharing) is a browser security mechanism that prevents web pages from making requests to a different origin (domain, protocol, or port) than the one that served them. This prevents malicious sites from making authenticated requests to other sites using a user's credentials. When a browser makes a cross-origin request, it either sends it directly (simple requests like GET with standard headers) or first sends a preflight OPTIONS request to check if the server allows it. The server responds with Access-Control-Allow-Origin and other CORS headers. If the origin isn't allowed, the browser blocks the response. Servers must explicitly whitelist allowed origins — setting it to * allows all origins but prevents credentials from being sent.`,
        evaluation: {
          score: 8,
          feedback: `Good answer that explains the security motivation, distinguishes simple requests from preflighted requests, and correctly notes the * vs credentials tradeoff. Understanding why CORS exists (not just how to fix it) demonstrates mature understanding. A strong response for this level.`,
          strengths: [
            'Explains the security motivation — prevents malicious cross-site authenticated requests',
            'Correctly notes that wildcard * origin cannot be combined with credentials: true',
          ],
          weaknesses: [
            'Could clarify that CORS is enforced by the browser, not the server — server-to-server requests are unaffected',
            'No mention of the specific headers: Access-Control-Allow-Methods, Access-Control-Allow-Headers',
          ],
          improvedAnswer: `CORS is a browser-enforced policy (not a server restriction) that blocks cross-origin fetch/XHR by default to prevent CSRF-style attacks where a malicious page could make authenticated requests to another site using stored cookies. For cross-origin requests, the browser checks the response's Access-Control-Allow-Origin header. If it doesn't match the requesting origin, the browser blocks the response (the request was still made — only the response is blocked). Requests with non-simple methods or headers trigger a preflight: the browser sends OPTIONS first; the server responds with Access-Control-Allow-Methods and Access-Control-Allow-Headers. Setting ACAO: * allows all origins but disables credential passing (cookies, auth headers). Server-to-server requests bypass CORS entirely since there's no browser enforcing it.`,
        },
      },
      {
        answer: `Cookies are small pieces of data stored by the browser and automatically sent with every request to the matching domain. They support expiry, HttpOnly (not accessible to JavaScript — prevents XSS), Secure (HTTPS only), and SameSite flags. Sessions are server-side data stores (in memory, Redis, or database) identified by a session ID stored in a cookie. They keep sensitive data on the server. localStorage persists data in the browser indefinitely until explicitly cleared, with no expiry and no automatic server sending — good for user preferences or draft content. sessionStorage is similar but clears when the browser tab closes. For JWTs, storing in localStorage is simple but risks XSS; storing in HttpOnly cookies is more secure but requires CSRF protection.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer that covers all three correctly, explains the security attributes of cookies in detail, and addresses the JWT storage debate with its tradeoffs. The HttpOnly/XSS and localStorage/XSS comparison is exactly what a senior interviewer would want to hear. One of the stronger possible answers to this question.`,
          strengths: [
            'Correctly explains HttpOnly, Secure, and SameSite cookie flags and their security implications',
            'Addresses the JWT storage tradeoff (localStorage vs httpOnly cookie) — shows security awareness',
          ],
          weaknesses: [
            'Could mention that sessions require sticky sessions or a shared store (Redis) for horizontal scaling',
            'No mention of cookie size limits (~4KB) vs localStorage (5-10MB)',
          ],
          improvedAnswer: `Cookies: automatically attached to all matching requests, support HttpOnly (no JS access, blocks XSS theft), Secure (HTTPS only), SameSite=Strict/Lax (CSRF protection), and explicit expiry. Sessions: server stores actual data (in Redis for scale), client only holds a session ID cookie — sensitive data never leaves the server, but horizontal scaling requires a shared session store. localStorage: ~5MB, persists indefinitely, never auto-sent to server, accessible by JS (XSS risk). sessionStorage: same as localStorage but cleared on tab close. JWT storage tradeoff: localStorage is simple but a single XSS vulnerability steals tokens; httpOnly cookies prevent JS access but need SameSite/CSRF tokens. Use httpOnly cookies for authentication tokens.`,
        },
      },
      {
        answer: `MVC separates an application into three layers. The Model handles data, business logic, and database interactions — it knows nothing about the UI. The View is the presentation layer — it renders data from the model for the user and knows nothing about data sources. The Controller is the glue — it receives user input, calls the appropriate model methods, then passes results to the view. In an Express app, routes map to controllers. Controllers call Mongoose models to query MongoDB and pass data to a template engine (view). In React apps, the equivalent is: services (model), components (view), and event handlers (controller). The benefit is separation of concerns — you can change your view layer without touching business logic.`,
        evaluation: {
          score: 8,
          feedback: `Good answer that correctly defines all three layers, gives a concrete Express mapping, and extends the pattern to React — showing you can apply the concept beyond its traditional context. The separation of concerns benefit is well-articulated.`,
          strengths: [
            'Concrete Express mapping (routes → controllers → Mongoose models → template engine) grounds the abstract concept',
            'Extends MVC thinking to React components, services, and event handlers — shows architectural versatility',
          ],
          weaknesses: [
            'No mention of MVC variants like MVVM (used in Angular) or MVP, which are relevant for modern frontend frameworks',
            'Could mention that fat controllers are a common antipattern — business logic should be in the model/service layer',
          ],
          improvedAnswer: `MVC separates concerns into three roles. Model: data access and business logic (Mongoose schemas, service functions) — framework-agnostic. View: presentation only — renders what it's given without business logic (Handlebars templates, React components). Controller: orchestrates request handling — parses input, calls services, returns responses. In Express: router → controller → service → model → send response. A common mistake is fat controllers containing business logic — move that to a service layer between controller and model for testability. React is closer to MVVM: components are views, hooks act as viewmodels (bind view to data), and services are the model. The core benefit: change your database without touching views; redesign the UI without touching business logic.`,
        },
      },
      {
        answer: `CSR (Client-Side Rendering) sends a minimal HTML shell and a large JavaScript bundle to the browser, which renders the UI entirely on the client. Good for highly interactive apps but bad for initial load time and SEO since crawlers see an empty page. SSR (Server-Side Rendering) renders HTML on the server per request and sends fully-formed HTML to the client. Better for SEO and initial load, but more server cost and complexity. SSG (Static Site Generation) pre-builds all HTML at build time — blazing fast since pages are served from a CDN with no server computation. Best for content that doesn't change per user, like blogs or docs. Next.js supports all three, sometimes mixed per page.`,
        evaluation: {
          score: 8,
          feedback: `Clear, accurate comparison that covers the SEO, performance, and infrastructure tradeoffs for each approach. Mentioning that CSR is bad for SEO because crawlers see an empty page is correct. The practical recommendation framework and Next.js mention show real-world awareness.`,
          strengths: [
            'Correctly identifies the SEO problem with CSR and why SSR/SSG solve it',
            'Mentions the infrastructure cost tradeoff of SSR vs the CDN delivery benefit of SSG',
          ],
          weaknesses: [
            'No mention of ISR (Incremental Static Regeneration) which solves the stale content problem of SSG',
            'Could mention hydration as the process by which SSR/SSG pages become interactive on the client',
          ],
          improvedAnswer: `CSR delivers an empty HTML shell + JS bundle; the browser builds the DOM. Fast subsequent navigation, great for dashboards and interactive apps, but poor initial load (large JS parse cost) and SEO (crawlers see empty content before JS runs). SSR renders full HTML per request on the server — good TTFB and SEO, but requires a live server and can be slow under load without caching. SSG pre-renders at build time — instant loads served from CDN edge, but stale between deployments; ISR (Next.js) solves this by regenerating pages in the background after a revalidation window. Hydration is the process where a static/server-rendered HTML page is "taken over" by React client-side. Modern apps (Next.js, Remix) mix all three per route: marketing pages as SSG, user-specific pages as SSR, dashboards as CSR.`,
        },
      },
    ],

    Medium: [
      {
        answer: `In a MERN stack, I'd implement auth end-to-end as follows. Registration: hash the password with bcrypt (never store plaintext), save the user to MongoDB. Login: find user by email, compare passwords with bcrypt.compare(), generate a JWT signed with a secret key containing the user ID and role. Send the JWT in the response. On the frontend, store it in localStorage or an httpOnly cookie. For protected API routes, attach the JWT in the Authorization: Bearer header using an Axios interceptor. On the backend, middleware verifies the signature with jwt.verify(), decodes the payload, fetches the user from MongoDB, and attaches it to req.user. Protected routes just check req.user.role for authorization.`,
        evaluation: {
          score: 8,
          feedback: `Strong end-to-end answer that correctly covers hashing, JWT signing, Axios interceptors, backend middleware, and authorization. The password comparison using bcrypt.compare() specifically shows you know not to compare hashes directly. A practical, implementation-aware response.`,
          strengths: [
            'Covers the complete flow from registration through to authorization middleware',
            'Correctly mentions Axios interceptors for attaching tokens — shows frontend implementation experience',
          ],
          weaknesses: [
            'No mention of token refresh strategy — what happens when the JWT expires?',
            'Could discuss the security tradeoff of localStorage (XSS risk) vs httpOnly cookie (CSRF risk) for token storage',
          ],
          improvedAnswer: `Registration: validate input → bcrypt.hash(password, 12) → User.create(). Login: User.findOne({email}) → bcrypt.compare(plain, hash) → jwt.sign({id, role}, SECRET, {expiresIn:'15m'}) → return {accessToken, refreshToken}. Store access token in memory (React state), refresh token in httpOnly cookie (protects against XSS). Axios request interceptor attaches Authorization: Bearer {accessToken}. Response interceptor catches 401 → calls /auth/refresh with cookie → gets new access token → retries original request. Backend auth middleware: jwt.verify(token, SECRET) → User.findById(decoded.id) → req.user. Authorization middleware checks req.user.role against required permissions. Refresh tokens stored in DB (hashed) for revocation capability.`,
        },
      },
      {
        answer: `REST uses multiple endpoints per resource with HTTP methods defining the operation — the server decides what data to return. GraphQL uses a single endpoint where the client specifies exactly what fields it needs in a query. This eliminates overfetching (getting more data than needed) and underfetching (needing multiple requests to get all data). REST is simpler to implement, benefits from HTTP caching out of the box, and is the right choice for most APIs. GraphQL shines when you have many different clients with different data needs (web, mobile, third parties) that query the same backend. The tradeoff is GraphQL adds complexity — schema definition, resolver functions, and N+1 query problems from nested resolvers.`,
        evaluation: {
          score: 8,
          feedback: `Balanced, experience-informed answer that correctly identifies GraphQL's strengths (flexible data fetching for varied clients) and weaknesses (complexity, N+1 resolver problem). Not blindly advocating for GraphQL shows engineering judgment. The practical recommendation framework is valuable.`,
          strengths: [
            'Correctly identifies overfetching/underfetching as the core problem GraphQL solves',
            'Acknowledges GraphQL\'s N+1 problem — shows awareness that it creates new challenges',
          ],
          weaknesses: [
            'No mention of GraphQL\'s challenges with caching — per-query caching is harder than REST\'s URL-based cache',
            'Could mention subscriptions as GraphQL\'s real-time capability vs REST\'s SSE/WebSocket approach',
          ],
          improvedAnswer: `REST: multiple endpoints, server-defined response shapes, HTTP caching by URL, simpler to implement and reason about. Best for most APIs. GraphQL: single /graphql endpoint, client-defined queries, strongly typed schema, introspectable. Solves over/underfetching for apps with varied clients (mobile needs minimal fields, web needs more). Tradeoffs: HTTP caching doesn't apply (all POSTs to one endpoint — use persisted queries or Apollo's cache); N+1 in resolvers solved by DataLoader batching; schema maintenance overhead. GraphQL subscriptions handle real-time data. Choose REST unless you have multiple client types with significantly different data needs, a public API where client flexibility matters, or a team comfortable with the GraphQL tooling overhead.`,
        },
      },
      {
        answer: `For file uploads I'd use multipart/form-data on the frontend with a file input. On the backend, multer middleware parses the multipart request, validates file type (check MIME type and extension — never trust extension alone), and enforces file size limits. I'd never store files on the server's filesystem since it doesn't scale horizontally. Instead, stream directly to S3 using the AWS SDK's upload method with the file buffer. Store the S3 URL in MongoDB. For security, generate random UUIDs for file names to prevent path traversal, serve files through signed URLs with expiry for private files, and scan for malware on upload if handling user content. Images get processed with Sharp for resizing and format conversion before storage.`,
        evaluation: {
          score: 9,
          feedback: `Excellent production-aware answer. Streaming to S3 instead of local storage, UUID filenames, signed URLs, MIME type validation (not just extension), and malware scanning all show real-world security and scalability thinking. Mentioning Sharp for image processing adds a practical detail. This is a senior-level answer.`,
          strengths: [
            'Notes that extension alone can\'t be trusted — must validate MIME type — showing security awareness',
            'Covers the full security checklist: UUID names, signed URLs, malware scanning, size limits',
          ],
          weaknesses: [
            'Could mention presigned S3 upload URLs as a pattern to upload directly from browser to S3, bypassing the server',
            'No mention of CDN in front of S3 for faster global file delivery',
          ],
          improvedAnswer: `Frontend: input type="file" → FormData → POST multipart/form-data. Backend pattern A (via server): multer parses → validate MIME type with file-type library (not extension alone) and size → stream to S3 via aws-sdk v3 Upload command with UUID key → store S3 key in DB. Pattern B (presigned URL, preferred at scale): frontend requests a presigned S3 URL from backend → uploads directly to S3 from browser → browser notifies backend on completion → backend records the S3 key. This bypasses your server entirely for large files. Security: random UUID filenames (prevent enumeration), private S3 bucket (no public access), signed GET URLs with short expiry for serving, virus scan with ClamAV or AWS GuardDuty for user uploads. Process images with Sharp: resize, convert to WebP, strip EXIF data. Serve via CloudFront CDN for performance.`,
        },
      },
      {
        answer: `HTTP is stateless and uses a request-response model — each request is independent. WebSockets establish a persistent bidirectional connection, starting as an HTTP upgrade request. Once established, either side can send messages at any time without the overhead of HTTP headers on each message. HTTP polling means the client repeatedly asks the server "anything new?" — inefficient and laggy. Long polling holds the request open until data is available, then responds, and the client immediately polls again — better but still overhead per message. Use WebSockets when you need real-time bidirectional communication: chat apps, live collaboration, gaming, or live dashboards. SSE (Server-Sent Events) is a good middle ground for one-directional server-to-client streaming over HTTP/2.`,
        evaluation: {
          score: 8,
          feedback: `Comprehensive answer that correctly explains all three approaches (polling, long polling, WebSockets) and adds SSE as a bonus fourth option. The practical use case guidance for WebSockets is good. Mentioning the HTTP upgrade handshake shows protocol-level understanding.`,
          strengths: [
            'Correctly explains the HTTP upgrade handshake that initiates a WebSocket connection',
            'Introduces SSE as a simpler alternative for one-directional streaming — shows breadth of options',
          ],
          weaknesses: [
            'No mention of WebSocket scaling challenges — sticky sessions or Redis pub/sub needed for multiple server instances',
            'Could mention that WebSockets require more infrastructure (load balancer support, connection state management)',
          ],
          improvedAnswer: `WebSockets upgrade an HTTP/1.1 connection (via Upgrade: websocket header) to a persistent full-duplex TCP channel. Either side can push messages at any time with minimal framing overhead. HTTP polling: client polls every N seconds — simple but wasteful and laggy. Long polling: client sends request; server holds it open until data is ready, responds, client immediately re-polls — lower latency but still per-message HTTP overhead. SSE: server pushes events over a persistent HTTP/2 connection (one direction only) — simpler than WebSockets, works through HTTP/2 multiplexing, supported natively in browsers. Use WebSockets for bidirectional real-time (chat, collaborative editing, gaming). Use SSE for server-to-client streams (live feeds, progress updates). WebSocket scaling requires sticky sessions or Redis pub/sub to broadcast across multiple server instances.`,
        },
      },
      {
        answer: `RBAC assigns permissions to roles rather than individual users, and users are assigned roles. On the backend, when a protected route is hit, middleware checks req.user.role against the required role for that resource. I'd define a roles hierarchy and a permissions map — for example, an admin role includes all user permissions plus delete and manage. On the frontend, I'd store the user's role in auth context and use it to conditionally render UI elements — hiding the admin dashboard link for non-admins, disabling buttons, or redirecting unauthorized users. The key principle is that frontend checks are just UX — all real authorization must happen on the backend, since API calls can be made directly without the UI.`,
        evaluation: {
          score: 8,
          feedback: `Good, practical answer that covers both layers correctly and importantly emphasises that frontend checks are UX-only — real security is on the backend. The roles hierarchy and permissions map is a clean implementation pattern. A solid mid-level response.`,
          strengths: [
            'Correctly distinguishes frontend role checks (UX) from backend role checks (security) — a key principle',
            'Mentions role hierarchy and permissions map — shows architectural thinking beyond simple role strings',
          ],
          weaknesses: [
            'No mention of resource-level authorization — role-level is often insufficient (users should only access their own data)',
            'Could discuss how to handle role changes — cached JWTs might carry stale roles until expiry',
          ],
          improvedAnswer: `RBAC: permissions assigned to roles, roles assigned to users. Backend implementation: JWT payload contains role → auth middleware attaches req.user → route-level authorization middleware checks permission (e.g. requireRole('admin') or requirePermission('posts:delete')). Define a permissions registry: { admin: ['*'], editor: ['posts:create','posts:edit'], viewer: ['posts:read'] }. Beyond role-level, add resource-level checks: users can only modify their own posts, even if they have the editor role. Frontend: read role from auth context → conditionally render UI, redirect unauthorized routes — but never trust this as security. RBAC limitation: JWTs cache the role at login. Role changes aren't reflected until token expiry; mitigate with short-lived tokens + refresh, or check roles from DB in middleware.`,
        },
      },
    ],

    Hard: [
      {
        answer: `The core challenge is conflict resolution when two users edit the same text simultaneously. I'd use Operational Transformation (OT) or CRDTs. With OT, each operation (insert character at position X, delete character at position Y) is transformed against concurrent operations to produce the same final state regardless of application order. The server is the source of truth and applies a total ordering to operations. For the infrastructure: clients connect via WebSockets, operations are sent to the server, transformed and broadcast to all clients. All operations are stored as an event log for history and offline reconciliation. CRDTs (Conflict-free Replicated Data Types) achieve convergence without a central coordinator, making them better for offline-first or P2P scenarios.`,
        evaluation: {
          score: 8,
          feedback: `Strong answer that correctly identifies OT and CRDTs as the two main approaches and explains why each exists. Explaining that OT requires a central server while CRDTs work P2P shows deep understanding of the architectural tradeoffs. The event log mention for history is a good addition.`,
          strengths: [
            'Correctly explains OT concept (transforming operations against concurrent ops for convergence)',
            'Distinguishes OT (server-coordinated) from CRDTs (decentralised) and their respective use cases',
          ],
          weaknesses: [
            'No mention of Yjs or Automerge as production-ready CRDT libraries that avoid implementing from scratch',
            'Could discuss the vector clock/revision numbering needed to detect conflicts and determine operation ordering',
          ],
          improvedAnswer: `Core challenge: concurrent edits must converge to the same document state. Two approaches: Operational Transformation (OT) — server assigns a total order to operations, transforms concurrent ops before applying. Client sends [op, revision]. Server transforms op against all ops since that revision, applies, broadcasts. Used by Google Docs. Requires central server. CRDTs (Conflict-free Replicated Data Types) — data structures that merge automatically. Yjs (text CRDT) or Automerge enable offline-first collaboration with P2P or server-mediated sync. Used by Figma, Linear. Implementation: WebSocket connection per user → op sent to server → server transforms/merges → broadcast to collaborators. Persist ops as event log for undo history and version history. Presence (cursor positions) sent separately at higher frequency via WebRTC or lightweight WebSocket channel.`,
        },
      },
      {
        answer: `I'd think in layers: stateless application servers scale horizontally behind a load balancer with auto-scaling based on CPU/RPS. The database tier separates reads and writes — primary handles writes, read replicas handle the heavy read load. A caching layer with Redis sits between app and database, caching hot data with appropriate TTLs and invalidation strategies. A CDN handles static assets and cacheable API responses globally. For the database itself, I'd shard by user ID ranges once a single instance hits its limits. Async background jobs go through a message queue (Kafka) to decouple processing from the request lifecycle. Microservices handle independent scaling of high-traffic domains.`,
        evaluation: {
          score: 8,
          feedback: `Strong systems design answer that addresses all the key layers: app tier, database read/write split, caching, CDN, sharding, and async processing. The layered approach demonstrates structured thinking. A solid response that would do well in a real system design interview.`,
          strengths: [
            'Addresses all layers: load balancing, DB read replicas, Redis caching, CDN, sharding, message queues',
            'Mentions cache invalidation strategies — often overlooked but critical for correctness',
          ],
          weaknesses: [
            'No mention of how to handle session state across horizontally-scaled instances (stateless JWT or Redis sessions)',
            'Could discuss consistency guarantees when using read replicas — replication lag means stale reads',
          ],
          improvedAnswer: `Scale in layers: (1) Stateless app servers behind ALB with auto-scaling groups (scale on CPU + RPS metrics). Use JWT for auth — no sticky sessions needed. (2) DB: single primary for writes → multiple read replicas for reads (accept replication lag for non-critical reads; route sensitive reads to primary). Cache with Redis (LRU, TTL-based) — cache hot user profiles, feed data, session data. Cache invalidation: write-through for consistency, TTL expiry for eventual. (3) CDN: Cloudfront for static assets + cache API responses with short TTLs. (4) Async: Kafka for event processing, email, notifications — decouple from request cycle. (5) Shard DB by user_id when single instance saturates. (6) Consider read-heavy workloads on Elasticsearch for search. Key metric: design so 95% of requests hit cache, not DB.`,
        },
      },
      {
        answer: `My CI/CD pipeline would be: code pushed to a PR triggers automated tests (unit, integration, e2e with Playwright). On merge to main, the pipeline builds a Docker image, tags it with the git SHA, and pushes to a container registry. For blue-green deployment, I maintain two identical production environments (blue=live, green=idle). The pipeline deploys the new image to green, runs smoke tests against it, then switches the load balancer to point to green. If smoke tests fail, the switch doesn't happen and green is rolled back. If something goes wrong post-switch, you flip the load balancer back to blue instantly. Database migrations run before the deployment using the expand-contract pattern to ensure backward compatibility with both old and new code.`,
        evaluation: {
          score: 9,
          feedback: `Excellent answer that covers the full pipeline with specific tooling decisions, correctly explains blue-green mechanics, and — most importantly — addresses database migrations in the context of blue-green deployment. The smoke test gate and instant rollback mechanism show production operational experience.`,
          strengths: [
            'Correctly explains blue-green mechanics: deploy to idle, smoke test, then switch load balancer',
            'Addresses the database migration challenge with expand-contract — the most overlooked aspect',
          ],
          weaknesses: [
            'Could mention canary deployments as an alternative that gradually shifts traffic percentage-by-percentage',
            'No mention of feature flags for decoupling deployment from feature release',
          ],
          improvedAnswer: `Pipeline: PR → lint + unit tests → integration tests → E2E (Playwright) → security scan (Snyk/Trivy). On merge to main: build Docker image tagged with git SHA → push to ECR → trigger deployment. Blue-green: two identical ECS task sets (or K8s deployments). Deploy new image to green. Run automated smoke tests and synthetic monitoring against green (using a staging CNAME or load balancer header routing). On pass: ALB weighted routing shifts 100% to green; blue becomes idle standby. On failure: green stays offline, blue unchanged. Rollback: one ALB rule change, seconds. DB migrations: run before deployment using expand-contract (new nullable columns, backward-compatible changes) so both blue and green code works with the migrated schema simultaneously. Use feature flags (LaunchDarkly) to decouple code deployment from feature release.`,
        },
      },
      {
        answer: `The main decision is data isolation strategy. Shared database with tenant ID column is simplest to operate — every query filters by tenantId, row-level security in Postgres can enforce this automatically. But noisy neighbours can impact performance and a bug could leak data between tenants. Separate database per tenant provides full isolation and lets tenants have different schemas, but operational complexity scales with tenant count. A middle ground is separate schemas in the same database. For billing, I'd integrate Stripe with a subscription model — each tenant has a Stripe customer ID and an active subscription with a plan tier stored in the database. Plan limits (number of users, API calls) are enforced at the application layer with middleware that checks the tenant's current usage against their plan.`,
        evaluation: {
          score: 8,
          feedback: `Well-structured answer that correctly presents the three data isolation strategies with their tradeoffs, and addresses billing with a concrete Stripe integration approach. The row-level security mention in Postgres shows database-level thinking. A strong response covering both the data architecture and business logic layers.`,
          strengths: [
            'Presents all three isolation strategies (shared, separate schema, separate DB) with clear tradeoffs',
            'Addresses billing with Stripe integration and plan-limit enforcement at application layer',
          ],
          weaknesses: [
            'No mention of tenant onboarding automation — provisioning infrastructure per tenant at signup',
            'Could discuss how to handle cross-tenant analytics or reporting for the platform owner',
          ],
          improvedAnswer: `Data isolation models: (1) Shared DB, tenant_id column on every table — simplest operations, cheapest, use Postgres RLS (Row Level Security) to enforce tenant isolation at DB level so app bugs can't leak data. (2) Shared DB, separate schemas per tenant — schema-level isolation, custom migrations per tenant, moderate complexity. (3) Separate DB per tenant — full isolation, custom scaling, expensive to operate beyond hundreds of tenants. Recommendation: start with shared DB + RLS; migrate high-value enterprise tenants to isolated DBs on demand. Billing: each tenant is a Stripe Customer with an active Subscription (plan tier). Webhooks update subscription status in real-time. Middleware checks tenant's plan limits (users, API calls, storage) against current usage before each request. Tenant onboarding: automated provisioning via a tenant-service that creates the account, sets up Stripe, seeds default data, and assigns a subdomain.`,
        },
      },
      {
        answer: `Observability has three pillars: logs, metrics, and traces. Logs capture discrete events — I'd use structured JSON logs with a correlation ID per request, shipped to a centralised system like Datadog or ELK stack. Metrics capture aggregate measurements over time — request rate, error rate, latency (p50, p95, p99), and saturation (CPU, memory, DB connections). I'd use Prometheus with Grafana dashboards and alert on SLO breaches, like error rate above 0.1% or p99 latency above 500ms. Distributed tracing with OpenTelemetry captures the full lifecycle of a request across multiple services, helping identify where latency comes from. For alerts, I'd use PagerDuty with runbooks linked from each alert.`,
        evaluation: {
          score: 9,
          feedback: `Excellent, production-grade answer that covers all three observability pillars with specific tooling and — importantly — mentions correlation IDs for log tracing, SLO-based alerting (not just threshold alerts), and distributed tracing for microservices. Mentioning runbooks alongside alerts shows operational maturity.`,
          strengths: [
            'Covers all three pillars (logs, metrics, traces) with specific, real tools for each',
            'Mentions p95/p99 latency percentiles and SLO-based alerting — more sophisticated than simple threshold alerts',
          ],
          weaknesses: [
            'Could mention the distinction between alerting on symptoms (user-facing SLOs) vs causes (internal metrics)',
            'No mention of error budget and how observability feeds into SRE practices',
          ],
          improvedAnswer: `Three pillars: Logs (events), Metrics (aggregates), Traces (request flow). Logs: structured JSON with a correlation/trace ID injected by middleware, level-filtered (error in prod), shipped to Datadog/Loki. Include request method, path, status, latency, user ID. Metrics: Prometheus client in app → scrape → Grafana. Core RED metrics per service: Rate (req/s), Errors (%), Duration (p50/p95/p99). Also track saturation: DB pool usage, queue depth, event loop lag. Alert on SLOs (user-facing): error rate >0.5%, p99 >1s. Traces: OpenTelemetry SDK instruments incoming requests, outgoing HTTP/DB calls, and queue operations → export to Jaeger/Datadog APM. Traces reveal where latency lives across services. Alerting: PagerDuty for P1 with runbooks. Principle: alert on symptoms (high error rate) not causes (CPU spike) to reduce false positives and focus on user impact.`,
        },
      },
    ],
  },
};

export default demoAnswers;
