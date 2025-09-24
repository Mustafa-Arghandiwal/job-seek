<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class RichTextLength implements ValidationRule
{
    protected int $min;
    protected int $max;

    public function __construct(int $min = 10, int $max = 65535)
    {
        $this->min = $min;
        $this->max = $max;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // strip HTML tags from the rich text
        $plainText = trim(strip_tags($value));
        $length = mb_strlen($plainText);

        if ($length < $this->min) {
            $fail("The {$attribute} must be at least {$this->min} characters.");
        }

        if ($length > $this->max) {
            $fail("The {$attribute} may not be greater than {$this->max} characters.");
        }
    }
}
