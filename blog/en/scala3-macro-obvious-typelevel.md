---
layout: post
title: 'Scala 3 macros: when type-level "obvious" doesn't actually work'
date: 2026-06-10
---

Scala 3 macros are powerful, but they expose a reality that is often surprising:

> What looks provable at the type level is not automatically usable in expression-level type positions.

This becomes especially visible when working with quoted types and extracted type variables.

### 🧩 The problem: "I matched the type, so the compiler should know everything"

A typical macro pattern looks like this:

```scala
val tt: TypeRepr = ...

tt.asType match {
  case '[Option[t]] =>
    // we now "know" t is inside Option
}
```

At this point, it is natural to assume:

> "I matched `Option[t]`, so I can safely use t anywhere with the right constraints."

However, when using `t` in a context requiring type bounds:

```scala
def f[T <: AnyVal]: Unit = ...

// ...

tt.asType match {
  case '[Option[t]] =>
    f[t]
}
```

the compiler rejects the call:

```
Type argument t does not conform to upper bound AnyVal
```

Even though, from the pattern match perspective, the extracted type variable appears structurally valid.

The type shape is known, but the required type evidence is not available.

#### Why inline predicates do not solve the problem

A common attempt is to encode the constraint through an inline predicate:

```scala
inline def isAnyVal[T]: Boolean =
  summonFrom {
    case _: (T <:< AnyVal) => true
    case _                 => false
  }
```

and then:

```scala
tt.asType match {
  case '[Option[t]] if isAnyVal[t] =>
}
```

This looks intuitive, especially for developers coming from languages such as TypeScript.

However, unlike TypeScript type predicates:

```typescript
x is number
```

a Scala Boolean condition does not refine the type system.

The compiler does not treat:

```scala
if (isAnyVal[t])
```

as a proof that:

```scala
t <: AnyVal
```

The information exists only as a runtime value, not as compile-time evidence.

#### TypeTest is not the same mechanism

Scala 3 `TypeTest` provides value-level type refinement.

For example:

```scala
def foo[T](x: T)(using TypeTest[T, String]) =
  x match {
    case s: String => s.length
    case _         => 0
  }
```

Here, Scala can refine the value:

```scala
x: T
```

into:

```scala
x: String
```

inside the pattern match.

However, this mechanism applies to values. It does not provide arbitrary compile-time refinement of reflected type variables inside macros.

### 🧠 The key insight

Scala 3 macros separate two different concerns.

**1. Type shape matching**

Examples:

- quoted patterns,
- structural decomposition,
- extraction of type variables.

For example:

```scala
'[Option[t]]
```

means:

> "This type has the shape `Option` applied to some type `t`."

**2. Type evidence**

Examples:

- `<:<`,
- `=:=`,
- implicit resolution,
- summoned proofs.

This answers a different question:

> "Can the compiler prove that this type satisfies a constraint?"

The crucial point is:

> Only type evidence can be reused in constrained type positions.

Matching a type shape does not automatically create the evidence required by another API.

### ✅ The solution: introduce explicit evidence

Instead of encoding constraints in patterns or Boolean conditions, introduce a type-level witness.

For example:

```scala
type IsAnyVal[T <: AnyVal] = T
```

Then:

```scala
tt.asType match {
  case '[Option[IsAnyVal[t]]] =>
    f[t]
}
```

Now the compiler has a real constraint attached to `t`.

### 💡 Why this works

Because:

- `t <: AnyVal` becomes an actual compile-time constraint;
- the compiler can validate uses of t in bounded type parameters;
- constrained APIs can safely accept t.

There is no inference trick involved.

The difference is subtle but fundamental:

- pattern matching tells the compiler what shape a type has;
- evidence tells the compiler what properties a type satisfies.

Scala's type system requires those two concepts to remain explicit.