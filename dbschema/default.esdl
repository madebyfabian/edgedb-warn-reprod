module default {
  type User {
    required property handle -> str {
      constraint exclusive;
    };
    property name -> str;
    property authId -> str;
    property description -> str;
    required property createdAt -> cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    required property updatedAt -> cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    multi link followingUsers -> User;
    # Indexes
    index on (.handle);
  }

  type Post {
    required property content -> str;
    required property createdAt -> cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    required property updatedAt -> cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    required property isDeleted -> bool {
      default := false;
    }
    required link authorUser -> User;
    multi link commentPosts -> Post;
    multi link postReactions -> PostReaction;
  }

  type PostReaction {
    required property createdAt -> cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    required property updatedAt -> cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    required link user -> User;
  }
}
