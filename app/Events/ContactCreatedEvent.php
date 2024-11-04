<?php

namespace App\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ContactCreatedEvent extends AbstractContactEvent implements ShouldBroadcast {}
