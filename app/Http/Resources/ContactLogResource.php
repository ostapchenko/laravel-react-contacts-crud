<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'field' => $this->field,
            'value_old' => $this->value_old,
            'value_new' => $this->value_new,
            'created_at' => $this->created_at,
            'user_id' => $this->user_id,
            'user_name' => $this->user->name,
        ];
    }
}
