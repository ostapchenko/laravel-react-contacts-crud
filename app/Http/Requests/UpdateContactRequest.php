<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // authorize only authenticated users
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name_first' => ['required', 'string'],
            'name_last' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:contacts,email,'.$this->contact->id],
            'phone' => ['required', 'phone:international,US'],
        ];
    }
}
