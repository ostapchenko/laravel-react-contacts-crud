<?php

namespace App\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ContactDeletedEvent extends AbstractContactEvent implements ShouldBroadcast {}
