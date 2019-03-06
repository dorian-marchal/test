// This file lists all available rules and their respective options.
// These are meant to be documentation: with every rules explicitly
// written down, one can easily see if a new rule's option answers
// exactly what we were looking for to activate this rule. Thus,
// every new rules and options must be added to this file when an
// update is being made, even if the rule or the option is not to
// be activated immediately.

// Running version: 4.12.0

module.exports = {
  plugins: ['jest'],
  env: {
    es6: true,
    node: true,
    'jest/globals': true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  rules: {
    // Possible Errors
    // Enforce "for" loop update clause moving the counter in the right direction.
    'for-direction': [
      'warn' // Consistency ensures there is no mistaken reads.
    ],

    // Enforce `return` statements in getters.
    'getter-return': [
      'warn', // Since ES5, every getter is expected to return a value.
      { allowImplicit: false }
    ],

    // Disallow `await` inside of loops.
    'no-await-in-loop': [
      'warn' // For performance optimization.
    ],

    // Disallow comparing against -0.
    'no-compare-neg-zero': [
      'warn' // Use `Object.is(x, -0)` instead.
    ],

    // Disallow assignment operators in conditional statements.
    'no-cond-assign': ['warn', 'except-parens'],

    // Disallow constant expressions in conditions.
    'no-constant-condition': ['warn'],

    // Disallow control characters in regular expressions.
    'no-control-regex': ['warn'],

    // Disallow the use of `debugger`.
    'no-debugger': ['warn'],

    // Disallow duplicate arguments in function definitions.
    'no-dupe-args': ['warn'],

    // Disallow duplicate keys in object literals.
    'no-dupe-keys': ['warn'],

    // Disallow duplicate case labels.
    'no-duplicate-case': [
      'off' // Already disabled by "no-restricted-syntax" (LabeledStatement).
    ],

    // Disallow empty character classes in regular expressions.
    'no-empty-character-class': ['warn'],

    // Disallow empty block statements.
    'no-empty': ['warn'],

    // Disallow reassigning exceptions in `catch` clauses.
    'no-ex-assign': ['warn'],

    // Disallow unnecessary boolean casts.
    'no-extra-boolean-cast': ['warn'],

    // Disallow reassigning `function` declarations.
    'no-func-assign': ['warn'],

    // Disallow `function` or `var` declarations in nested blocks.
    'no-inner-declarations': ['warn', 'functions'],

    // Disallow invalid regular expression strings in `RegExp` constructors.
    'no-invalid-regexp': ['warn'],

    // Disallow irregular whitespace.
    'no-irregular-whitespace': ['warn'],

    // Disallow negating the left operand in `in` expressions.
    'no-negated-in-lhs': ['warn'],

    // Disallow calling global object properties as functions.
    'no-obj-calls': ['warn'],

    // Disallow the use of `Object.prototypes` builtins directly.
    'no-prototype-builtins': [
      'off' // Might sometimes be useful to use `Object.prototypes` builtins.
    ],

    // Disallow multiple spaces in regular expression literals.
    'no-regex-spaces': ['warn'],

    // Disallow sparse arrays.
    'no-sparse-arrays': ['warn'],

    // Disallow template literal placeholder syntax in regular strings.
    'no-template-curly-in-string': [
      'off' // To enable as soon as it works well with `_.template`.
    ],

    // Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements.
    'no-unreachable': ['warn'],

    // Disallow control flow statements in `finally` blocks.
    'no-unsafe-finally': ['warn'],

    // Disallow negating the left operand of relational operators.
    'no-unsafe-negation': ['warn'],

    // Require calls to `isNaN()` when checking for `NaN`.
    'use-isnan': ['warn'],

    // Enforce valid JSDoc comments.
    'valid-jsdoc': [
      'warn',
      {
        prefer: {
          arg: 'param',
          argument: 'param',
          return: 'returns'
        },
        preferType: {
          array: 'Array',
          boolean: 'Boolean',
          function: 'Function',
          Null: 'null',
          number: 'Number',
          object: 'Object',
          string: 'String',
          symbol: 'Symbol'
        },
        requireReturn: false,
        requireReturnType: true,
        matchDescription: '.+',
        requireParamDescription: true,
        requireReturnDescription: true
      }
    ],

    // Enforce comparing `typeof` expressions against valid strings.
    'valid-typeof': ['warn', { requireStringLiterals: false }],

    // Best Practices
    // Enforce getter and setter pairs in objects.
    'accessor-pairs': ['off'],

    // Enforce `return` statements in callbacks of array’s methods.
    'array-callback-return': ['warn'],

    // Enforce that class methods utilize `this`.
    'class-methods-use-this': [
      'off', // This rule implies the use of `static` methods which is a bit strange, particularly in components.
      { exceptMethods: [] }
    ],

    // Enforce a maximum cyclomatic complexity allowed in a program.
    complexity: ['off'],

    // Require `default` cases in `switch` statements.
    'default-case': [
      'off' // Already disabled by "no-restricted-syntax" (SwitchStatement).
    ],

    // Enforce dot notation whenever possible.
    'dot-notation': [
      'warn',
      {
        allowKeywords: true,
        allowPattern: ''
      }
    ],

    // Require the use of `===` and `!==`.
    eqeqeq: ['warn', 'always'],

    // Require `for-in` loops to include an `if` statement.
    'guard-for-in': ['warn'],

    // Disallow the use of `alert`, `confirm`, and `prompt`.
    'no-alert': ['warn'],

    // Disallow the use of `arguments.caller` or `arguments.callee`.
    'no-caller': ['warn'],

    // Disallow lexical declarations in case clauses.
    'no-case-declarations': [
      'off' // Already disabled by "no-restricted-syntax" (LabeledStatement).
    ],

    // Disallow division operators explicitly at the beginning of regular expressions.
    'no-div-regex': [
      'off' // There is no ambiguity due to the enabled "space-infix-ops" rule.
    ],

    // Disallow `else` blocks after `return` statements in `if` statements.
    'no-else-return': [
      'warn',
      { allowElseIf: false } // In this case, else/if is overkill.
    ],

    // Disallow empty destructuring patterns.
    'no-empty-pattern': ['warn'],

    // Disallow `null` comparisons without type-checking operators.
    'no-eq-null': ['warn'],
    'no-eval': [
      // Disallow the use of `eval()`.
      'warn',
      { allowIndirect: false }
    ],

    // Disallow extending native types.
    'no-extend-native': ['warn'],

    // Disallow unnecessary calls to `.bind()`.
    'no-extra-bind': ['warn'],

    // Disallow unnecessary labels.
    'no-extra-label': [
      'off' // Already disabled by "no-restricted-syntax" (LabeledStatement)
    ],

    // Disallow fallthrough of `case` statements.
    'no-fallthrough': [
      'off' // Already disabled by "no-restricted-syntax" (LabeledStatement).
    ],

    // Disallow assignments to native objects or read-only global variables.
    'no-global-assign': [
      'warn', // Avoid overwritting built-in global variables.
      { exceptions: [] }
    ],

    // Disallow shorthand type conversions.
    'no-implicit-coercion': [
      'warn',
      {
        boolean: true,
        number: true,
        string: true,
        allow: []
      }
    ],

    // Disallow `var` and named `function` declarations in the global scope.
    'no-implicit-globals': ['warn'],

    // Disallow the use of `eval()`-like methods.
    'no-implied-eval': ['warn'],

    // Disallow `this` keywords outside of classes or class-like objects.
    'no-invalid-this': [
      'off' // Does not fit our usage of "this" in several cases.
    ],

    // Disallow the use of the `__iterator__` property.
    'no-iterator': ['warn'],

    // Disallow labeled statements.
    'no-labels': [
      'off', // Already disabled by "no-restricted-syntax" (LabeledStatement)
      { allowLoop: false, allowSwitch: false }
    ],

    // Disallow unnecessary nested blocks.
    'no-lone-blocks': ['warn'],

    // Disallow `function` declarations and expressions inside loop statements.
    'no-loop-func': ['warn'],

    // Disallow magic numbers.
    'no-magic-numbers': [
      'off', // Magic numbers may be intuitive.
      {
        ignore: [],
        ignoreArrayIndexes: false,
        enforceConst: false,
        detectObjects: false
      }
    ],

    // Disallow multiline strings.
    'no-multi-str': ['warn'],

    // Disallow assignments to native objects or read-only global variables.
    'no-native-reassign': ['warn', { exceptions: [] }],

    // Disallow new operators with the `Function` object.
    'no-new-func': ['warn'],

    // Disallow `new` operators with the `String`, `Number`, and `Boolean` objects.
    'no-new-wrappers': ['warn'],

    // Disallow `new` operators outside of assignments or comparisons.
    'no-new': ['warn'],

    // Disallow octal escape sequences in string literals.
    'no-octal-escape': ['warn'],

    // Disallow octal literals.
    'no-octal': ['warn'],

    // Disallow reassigning `function` parameters.
    'no-param-reassign': ['warn', { props: false }],

    // Disallow the use of the `__proto__` property.
    'no-proto': ['warn'],

    // Disallow `var` redeclaration.
    'no-redeclare': ['warn'],
    // Disallow certain properties on certain objects.
    'no-restricted-properties': [
      'warn',
      {
        property: 'eql',
        message: "It can be mistaken with 'equal'. Use 'deep.equal' instead"
      },
      {
        object: '_',
        property: 'compact',
        message:
          "It relies on falsy values. Use '_.reject(myArray, _.isNil)' instead"
      },
      {
        object: 'React', // @TODO Deactivate when 'react/no-deprecated' handles it correctly.
        property: 'PropTypes',
        message:
          "React.PropTypes is deprecated. Use 'prop-types' package instead."
      }
    ],

    // Disallow assignment operators in return statements.
    'no-return-assign': ['warn', 'except-parens'],

    // Disallow unnecessary `return await`.
    'no-return-await': [
      'off' // We wish to use async/await principle (see https://stackoverflow.com/a/42750371).
    ],

    // Disallow `javascript:` urls.
    'no-script-url': ['warn'],

    // Disallow assignments where both sides are exactly the same.
    'no-self-assign': ['warn', { props: false }],

    // Disallow comparisons where both sides are exactly the same.
    'no-self-compare': ['warn'],

    // Disallow throwing literals as exceptions.
    'no-throw-literal': ['warn'],

    // Disallow unmodified loop conditions.
    'no-unmodified-loop-condition': ['warn'],

    // Disallow unused expressions.
    'no-unused-expressions': [
      'off', // Replaced by "chai-friendly/no-unused-expressions" which does not warn for specific chai expect statements.
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],

    // Disallow unused expressions.
    'no-unused-labels': [
      'off' // Already disabled by "no-restricted-syntax" (LabeledStatement)
    ],

    // Disallow unnecessary `.call()` and `.apply()`.
    'no-useless-call': ['warn'],

    // Disallow unnecessary concatenation of literals or template literals.
    'no-useless-concat': ['warn'],

    // Disallow unnecessary escape characters.
    'no-useless-escape': ['warn'],

    // Disallow redundant return statements.
    'no-useless-return': ['warn'],

    // Disallow `void` operators.
    'no-void': ['off'],

    // Disallow specified warning terms in comments.
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'tofix', 'fixme'],
        location: 'anywhere'
      }
    ],

    // Disallow `with` statements.
    'no-with': ['warn'],

    // Require using Error objects as Promise rejection reasons.
    'prefer-promise-reject-errors': ['warn', { allowEmptyReject: false }],

    // Enforce the consistent use of the radix argument when using `parseInt()`.
    radix: [
      'off' // We always use decimal integers.
    ],

    // Disallow async functions which have no `await` expression.
    'require-await': [
      'off' // Does not recognize `await` when assigned to `const`.
    ],

    // Require or disallow “Yoda” conditions.
    yoda: ['warn', 'never'],

    // Strict Mode
    // Require or disallow strict mode directives.
    strict: ['warn', 'never'],

    // Variables
    // Require or disallow initialization in `var` declarations.
    'init-declarations': [
      'off', // With "let" declarations, we sometimes want an initialization too.
      'never',
      { ignoreForLoopInit: true }
    ],

    // Disallow `catch` clause parameters from shadowing variables in the outer scope.
    'no-catch-shadow': ['warn'],

    // Disallow deleting variables.
    'no-delete-var': [
      'warn' // The purpose of the `delete` operator is to remove a property from an object.
    ],

    // Disallow labels that share a name with a variable.
    'no-label-var': [
      'off' // Already disabled by "no-restricted-syntax" (LabeledStatement)
    ],

    // Disallow specified global variables.
    'no-restricted-globals': [
      'off' // We do not have any restricted global variables.
    ],

    // Disallow identifiers from shadowing restricted names.
    'no-shadow-restricted-names': ['warn'],

    // Disallow `var` declarations from shadowing variables in the outer scope.
    'no-shadow': [
      'warn',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: ['value', 'done']
      }
    ],

    // Disallow the use of undeclared variables unless mentioned in `/* global */` comments.
    'no-undef': ['warn', { typeof: false }],

    // Disallow initializing variables to `undefined`.
    'no-undef-init': ['warn'],

    // Disallow unused variables.
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '',
        caughtErrors: 'none',
        caughtErrorsIgnorePattern: '^ignore', // Force to be explicit, please document why the error is ignored.
        ignoreRestSiblings: false
      }
    ],

    // Node.js and CommonJS
    // Require `return` statements after callbacks.
    'callback-return': ['warn', ['callback', 'cb']],

    // Require `require()` calls to be placed at top-level module scope.
    'global-require': [
      'off' // In some cases, we need to use `require()` calls inside the scope.
    ],

    // Require error handling in callbacks.
    'handle-callback-err': ['warn'],

    // Disallow use of the `Buffer()` constructor.
    'no-buffer-constructor': [
      'warn' // Buffer constructor has been deprecated for security issues.
    ],

    // Disallow `require` calls to be mixed with regular `var` declarations.
    'no-mixed-requires': ['warn', { grouping: false, allowCall: false }],

    // Disallow `new` operators with calls to `require`.
    'no-new-require': ['warn'],

    // Disallow string concatenation with `__dirname` and `__filename`.
    'no-path-concat': ['warn'],

    // Disallow the use of `process.env`.
    'no-process-env': [
      'off' // Should be activated to avoid global dependencies.
    ],

    // Disallow the use of `process.exit()`.
    'no-process-exit': ['warn'],

    // Disallow specified node modules when loaded by `require`.
    'no-restricted-modules': [
      'off' // We do not have any restricted node modules.
    ],

    // Disallow synchronous methods.
    'no-sync': [
      'warn', // Avoid locking up the server.
      { allowAtRootLevel: false }
    ],

    // Enforce camelcase naming convention.
    camelcase: ['warn', { properties: 'always' }],

    // Enforce or disallow capitalization of the first letter of a comment.
    'capitalized-comments': [
      'warn',
      'always',
      {
        ignorePattern: 'prettier-ignore',
        ignoreInlineComments: false,
        ignoreConsecutiveComments: true // In case a sentence needs multiple lines to be written.
      }
    ],

    // Require function names to match the name of the variable or property to which they are assigned.
    'func-name-matching': ['warn', 'always'],

    // Require identifiers to match a specified regular expression.
    'id-match': [
      'off',
      '^[a-z]+([A-Z][a-z]+)*$',
      { properties: false, onlyDeclarations: false }
    ],

    // Enforce position of line comments.
    'line-comment-position': [
      'warn', // For consistency.
      { position: 'above' } // Aerate the code and avoid comments to break "max-len" rule.
    ],

    // Enforce consistent linebreak style.
    'linebreak-style': ['warn', 'unix'],

    // Require or disallow an empty line between class members.
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: false }
    ],

    // Require or disallow newlines around directives.
    'lines-around-directive': [
      'off', // We do not use directives.
      'always'
    ],

    // Enforce a maximum depth that blocks can be nested.
    'max-depth': [
      'off', // It depends too much on the case.
      4
    ],

    // Enforce a maximum file length.
    'max-lines': [
      'off',
      {
        max: 300,
        skipBlankLines: false,
        skipComments: false
      }
    ],

    // Enforce a maximum depth that callbacks can be nested.
    'max-nested-callbacks': ['off', 10],

    // Enforce a maximum number of statements allowed per line.
    'max-statements-per-line': ['warn', { max: 1 }],

    // Enforce a maximum number of statements allowed in `function` blocks.
    'max-statements': ['off', 10, { ignoreTopLevelFunctions: false }],

    // Enforce a particular style for multiline comments.
    'multiline-comment-style': ['warn', 'separate-lines'],

    // Require constructor `function` names to begin with a capital letter.
    'new-cap': [
      'warn',
      {
        newIsCap: true,
        capIsNew: true,
        properties: true,
        newIsCapExceptions: [],
        capIsNewExceptions: ['NaN']
      }
    ],

    // Require or disallow an empty line after `var` declarations.
    'newline-after-var': ['off', 'always'],

    // Require an empty line before `return` statements.
    'newline-before-return': ['off'],

    // Disallow `Array` constructors.
    'no-array-constructor': ['warn'],

    // Disallow bitwise operators.
    'no-bitwise': ['warn', { allow: [], int32Hint: false }],

    // Disallow `continue` statements.
    'no-continue': ['warn'],

    // Disallow inline comments after code.
    'no-inline-comments': ['warn'],

    // Disallow `if` statements as the only statement in `else` blocks.
    'no-lonely-if': ['warn'],

    // Disallow use of chained assignment expressions.
    'no-multi-assign': ['warn'],

    // Disallow negated conditions.
    'no-negated-condition': ['warn'],

    // Disallow nested ternary expressions.
    'no-nested-ternary': ['warn'],

    // Disallow `Object` constructors.
    'no-new-object': ['warn'],

    // Disallow specified syntax.
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'ExportAllDeclaration',
        message: 'All exported declaration must be named'
      },
      {
        selector: 'WithStatement',
        message: 'with statement is deprecated since ES5'
      },
      {
        selector: 'LabeledStatement',
        message: 'Avoid using labels, they make the code hard to read'
      }
    ],

    // Disallow ternary operators.
    'no-ternary': [
      'off' // Might be useful when having a short and concise condition.
    ],

    // Disallow dangling underscores in identifiers.
    'no-underscore-dangle': [
      'off', // We explicitly use it to warn about functions that should not be used out of their definition's folder.
      {
        allow: [],
        allowAfterSuper: false,
        allowAfterThis: false,
        enforceInMethodNames: false
      }
    ],

    // Disallow ternary operators when simpler alternatives exist.
    'no-unneeded-ternary': ['warn', { defaultAssignment: true }],

    // Require or disallow assignment operator shorthand where possible.
    'operator-assignment': ['warn', 'never'],

    // Require or disallow padding lines between statements.
    'padding-line-between-statements': [
      'off' // Depends on the number of statements and the context.
    ],

    // Require object keys to be sorted.
    'sort-keys': [
      'off', // We do not care about object keys sorting.
      'asc',
      { caseSensitive: false, natural: false }
    ],

    // Require variables within the same declaration block to be sorted.
    'sort-vars': ['off', { ignoreCase: false }],

    // Enforce consistent spacing after the `//` or `/*` in a comment.
    'spaced-comment': [
      'warn',
      'always',
      {
        line: {
          markers: [],
          exceptions: []
        },
        block: {
          markers: [],
          exceptions: [],
          balanced: true
        }
      }
    ],

    // ECMASCript 6
    // Require braces around arrow function bodies.
    'arrow-body-style': ['warn', 'as-needed'],

    // Require `super()` calls in constructors.
    'constructor-super': ['warn'],

    // Disallow reassigning class members.
    'no-class-assign': ['warn'],

    // Disallow reassigning `const` variables.
    'no-const-assign': ['warn'],

    // Disallow duplicate class members.
    'no-dupe-class-members': ['warn'],

    // Disallow duplicate module imports.
    'no-duplicate-imports': [
      'off', // Better handled by "import/no-duplicates" rule.
      { includeExports: true }
    ],

    // Disallow `new` operators with the `Symbol` object.
    'no-new-symbol': ['warn'],

    // Disallow specified modules when loaded by `import`.
    'no-restricted-imports': [
      'warn',
      {
        name: 'angular',
        message: 'You fool!'
      },
      {
        name: 'eslint',
        message: 'Please use "gulp-eslint" instead'
      },
      {
        name: 'minimist',
        message: 'Please use "yargs" instead'
      },
      {
        name: 'node-fetch',
        message: 'Please use "isomorphic-fetch" instead'
      },
      {
        name: 'react',
        importNames: ['PropTypes'],
        message:
          'React.PropTypes is deprecated, please use "prop-types" package instead'
      },
      {
        name: 'react-addons-pure-render-mixin',
        message:
          'This package is deprecated, please use "React.PureComponent" instead'
      },
      {
        name: 'stylelint',
        message: 'Please use command line instead'
      },
      {
        name: 'superagent',
        message: 'Please use "isomorphic-fetch" instead'
      },
      {
        name: 'underscore',
        message: 'Please use "lodash" instead'
      },
      {
        name: 'whatwg-fetch',
        message: 'Please use "isomorphic-fetch" instead'
      }
    ],

    // Disallow `this`/`super` before calling `super()` in constructors.
    'no-this-before-super': ['warn'],

    // Disallow unnecessary computed property keys in object literals.
    'no-useless-computed-key': ['warn'],

    // Disallow unnecessary constructors.
    'no-useless-constructor': ['warn'],

    // Disallow renaming import, export, and destructured assignments to the same name.
    'no-useless-rename': [
      'warn',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false
      }
    ],

    // Require or disallow method and property shorthand syntax for object literals.
    'object-shorthand': [
      'warn',
      'always',
      {
        avoidQuotes: false,
        ignoreConstructors: false,
        avoidExplicitReturnArrows: false
      }
    ],

    // Require `const` declarations for variables that are never reassigned after declared.
    'prefer-const': [
      'warn',
      { destructuring: 'any', ignoreReadBeforeAssign: false }
    ],

    // Disallow `parseInt()` in favor of binary, octal, and hexadecimal literals.
    'prefer-numeric-literals': ['warn'],

    // Require `Reflect` methods where applicable.
    'prefer-reflect': [
      'off' // Deprecated since 3.9.0.
    ],

    // Require spread operators instead of `.apply()`.
    'prefer-spread': ['warn'],

    // Require template literals instead of string concatenation.
    'prefer-template': ['warn'],

    // Enforce sorted import declarations within modules.
    'sort-imports': [
      'off', // Managed by "import-order/import-order" rule.
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],

    // Require symbol descriptions.
    'symbol-description': [
      'off' // We do not care about having descriptions in symbols.
    ]
  }
};
