# Bring Logging to the Next Level

This repo takes us through the process of building up a software system from a naive, debug-centric logging scheme, through to a fully featured
execution engine that supports logging, telemetry and lots of other stuff; while still keeping core business logic clean and uncluttered.

## How to Use

Each commit in the repo is one 'stage' along the progression:

1. Simple business logic with no instrumentation
2. Simple debug logging, valuable for local debugging, not useful for production.
3. Simple production logging, valuable for tracing what happened in a production case.
4. Slightly better production logging, helping to localize failures a bit better.
5. Better production logging still, trapping and highlighting failures, but adding significant risk and noise.
6. Encapsulation of transactional log processing in a closure, removing most of the noise.
7. Addition of structured logging, enabling much more powerful logging output, and expanding into telemetry and analytics purposes, without adding much, if any,
   noise to the business logic.
8. Encapsulating all structured logging and telemetry into a simple execution framework, where functionality is organised into labeled commands.

## Insights

It's been long held as a truism that focusing a block of code on a single purpose makes it much easier to understand and modify. Sometimes it's obvious
how to separate code written for a different purpose (for example, isolating your purchasing subsystem away from your sales subsystem); sometimes it's not
(logging, analytics, exception handling, etc). This latter problem is known as a /cross-cutting concern/: something you know you need, but which touches
lightly on many areas of the system, and isn't easily sequestered into its own component.

Isolating 'regular' concerns is usually straightforward (put it in a separate function or file, and invoke it from somewhere else). However, isolating 
cross-cutting concerns generally requires the use of some advanced programming techniques and structures, which has the difficult side-effect of creating
noise in the code--exactly what you're trying to avoid. This is one of the main drivers of feature development in programming languages: enabling you to
implement more advanced structures with smaller, cleaner code.

* Steps 1-4 above are simply changes in how we write log lines; no advanced programming techniques are being used.
* Step 5 makes use of the language's try/catch feature to improve logging, but actually makes the business logic itself worse in the process. This highlights
  the challenging nature of cross-cutting concerns.
* Step 6 demonstrates the use of the "lambda" (arrow function) and first-class function language features of Javascript to encapsulate the control flow used
  in step 5. This is a powerful example of using language features to manage cross-cutting concerns, reducing code noise by something like 60%, while
  massively increasing the potential for reuse and reducing the risk of bugs that are side-effects of having logging in the first place.
* Step 7 demonstrates something else; that logging, runtime telemetry, profiling, analytics, and other "observational" code concerns can all be made to fall into
  a similar framework. By extracting the cross-cutting concern into a module, we've given ourselves a place to put additional logic that takes advantage of the
  same logical 'insertion point' (i.e. "around" the business logic we actually want to execute).
* Step 8 takes things one final step, hiding the concern from the business logic entirely, by recognizing that the sequential execution of code *itself* is
  actually a cross-cutting concern (albeit, one that almost all languages have a simple default syntax for). We surface that concern into a
  proper subsystem, which we call an 'execution engine', and then we decorate the code we want to execute with metadata like a label (the class name) and some
  surfaced parameters (given in the constructor); and we split apart the *binding* of the call (when argument values are provided) away from the *execution*
  of the call (when the code using those arguments gets run).
  
The final status leaves things in a somewhat 'messy' state, in that we've added significant noise against the business logic itself. However, that noise is
pretty "declarative" in nature, in that we're just describing the operation we want to perform in greater detail--as opposed to asking the system to do more stuff
in a cross-cutting way. The 'decorations' are all directly relevant to the task at hand, so although the code we write is more verbose, it isn't any less
encapsulated, or more cross-cutting.

We often have the impression as developers that the goal is to write fewer lines of code--this is true, but frankly, writing lines of code is not hte expensive
part of being a developer; reasoning about code is what really consumes all of our time. We can afford to write a lot more actual lines of relatively simple
code, if it helps us to reason more effectively.

Like I said before, how easy it is to manage cross-cutting concerns often depends on language features. In our 'final form' above, things are probably noisier
than they need to be for a language like ES2016. You can think about how you could use other language features to simplify things further; like promises, functions-as-objects, async/await, method chaining, object
elaboration, destructuring, varargs arguments, and maybe more.

In the final analysis, what we've done goes far beyond logging. We've created an abstraction layer between _what_ we want to do, _how_ we do it, and _when_
it happens. This is an extremely powerful layer of abstraction, which almost all platforms and frameworks take advantage of to some extent. However, when you let
a platform that you don't control impose this abstraction, you lose the most of the power of the _how_ and _when_ part of the puzzle. The framework dictates
them, in the same way that the programming language dictated it before you added the abstraction.

Once that happens, you'll often find that you're wrestling with the framework, in the same way you were wrestling with the language before; cross-cutting concerns
creep back into business logic, this time trying to change how the framework behaves. Frameworks come in many shapes and sizes, and have different default
assumptions. If what you need lines up well with what the framework provides, you probably won't suffer too much; but when what you need doesn't line up,
things get hairy, fast. You often wind up wondering how much the framework is really helping, and how much it's in your way.

## Conclusion

My contention is this: every nontrivial application should evolve its own, purpose-built execution abstraction. It's not about having a particular abstraction
that does a particular set of things. It's about being aware of the concept, so that you can use it when you need it, to make your code easier to reason
about for yourself, and for others down the road.

One final warning on frameworks, however. Languages are carefully designed, they work very well, and they are generally very well documented. The same cannot
be said for most frameworks; including a framework you write yourself. Consider carefully what features and characteristics you are going to pull up into the
framework, and how you plan on using them; and consider how future developers will understand the behaviour of the framework. If you don't have a really good
way to communicate the structure and behaviour of your framework to future developers (including yourself, next year), you might want to avoid it. The best
way to communicate is through the code itself: names, type restrictions, compile-time validation, lint hints, well-defined and consistent APIs,
autodocumenting comments.
